/**
 * ===================================================================
 * Knowledge Base v3 — Two-Column Sidebar + Inline Content Panel
 * ===================================================================
 */

(function () {
  'use strict';

  /* ── Configuration ───────────────────────────────────────────── */
  var CONFIG = {
    githubUser: 'nagarajcruze',
    githubRepo: 'knowledge-base',
    githubBranch: 'main',
    useDemoData: false, // Fetch from GitHub repository
  };

  /* ── State variables ─────────────────────────────────────────── */
  var currentManifest = null;
  var activeCategoryId = null;
  var activeFilePath = null;
  var targetHeadingId = null;
  var contentCache = {};
  var prefetchedFile = null;
  var prefetchInProgress = false;
  var pendingNextNavigation = false;

  /* ── DOM Selectors ───────────────────────────────────────────── */
  var catTabsContainer, topicsContainer, contentPanel, contentPlaceholder, contentInner, panelBody, panelBreadcrumb, closeBtn, backdropEl, zenBtn, progressBar;

  /* ── Utilities ───────────────────────────────────────────────── */
  function debounce(func, wait) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }

  function trackPageView(url, title) {
    if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track(function (props) {
        return Object.assign({}, props, {
          url: url,
          title: title || document.title
        });
      });
    } else {
      setTimeout(function () {
        if (window.umami && typeof window.umami.track === 'function') {
          window.umami.track(function (props) {
            return Object.assign({}, props, {
              url: url,
              title: title || document.title
            });
          });
        }
      }, 300);
    }
  }

  window.copyHeadingLink = function (e, id) {
    e.preventDefault();
    if (!activeFilePath) return;

    var target = e.currentTarget; // Capture target synchronously!
    var baseUrl = window.location.href.split('#')[0];
    var pathStr = '#kb/' + encodeURIComponent(activeFilePath.replace('.md', ''));
    var fullLink = baseUrl + pathStr + '#' + id;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullLink).then(function () {
        if (target) {
          target.classList.add('copied');
          setTimeout(function () {
            target.classList.remove('copied');
          }, 1500);
        }

        // Track copied heading link in Umami with topic prefix
        if (window.umami && typeof window.umami.track === 'function') {
          var activeBtn = document.querySelector('.kb-topic-btn.active');
          var topicLabel = activeBtn ? activeBtn.querySelector('.kb-topic-label').textContent : '';
          var displayLabel = topicLabel ? (topicLabel + ' > #' + id) : ('#' + id);
          window.umami.track('Anchor: ' + displayLabel, {
            file: activeFilePath
          });
        }
      });
    }

    if (history.replaceState) {
      history.replaceState(null, null, pathStr + '#' + id);
    }
  };

  function countTopics(category) {
    var count = 0;
    if (category.groups) {
      category.groups.forEach(function (g) {
        count += g.topics ? g.topics.length : 0;
      });
    }
    return count;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function rawUrl(filePath) {
    return 'https://raw.githubusercontent.com/' + CONFIG.githubUser + '/' + CONFIG.githubRepo + '/' + CONFIG.githubBranch + '/' + filePath;
  }

  /* ── Sidebar Categories Grid ─────────────────────────────────── */
  function renderCategoryTabs(manifest) {
    if (!catTabsContainer) return;

    // Remove existing category tabs, but preserve search tab
    catTabsContainer.querySelectorAll('.kb-cat-tab').forEach(function (tab) {
      tab.remove();
    });

    // Add "All Topics" tab
    var totalTopicsCount = 0;
    manifest.categories.forEach(function (cat) {
      totalTopicsCount += countTopics(cat);
    });

    var allTab = document.createElement('button');
    allTab.className = 'kb-cat-tab';
    allTab.setAttribute('data-category', 'all');
    allTab.type = 'button';
    allTab.innerHTML =
      '<span class="kb-cat-tab-icon">🌐</span>' +
      '<div class="kb-cat-tab-meta">' +
      '<span class="kb-cat-tab-label">All Topics</span>' +
      '<span class="kb-cat-tab-count">' + totalTopicsCount + '</span>' +
      '</div>';

    allTab.addEventListener('click', function () {
      selectCategory('all');
    });

    catTabsContainer.appendChild(allTab);

    manifest.categories.forEach(function (cat) {
      var tab = document.createElement('button');
      tab.className = 'kb-cat-tab';
      tab.setAttribute('data-category', cat.id);
      tab.type = 'button';

      var count = countTopics(cat);

      tab.innerHTML =
        '<span class="kb-cat-tab-icon">' + cat.icon + '</span>' +
        '<div class="kb-cat-tab-meta">' +
        '<span class="kb-cat-tab-label">' + cat.label + '</span>' +
        '<span class="kb-cat-tab-count">' + count + '</span>' +
        '</div>';

      tab.addEventListener('click', function () {
        selectCategory(cat.id);
      });

      catTabsContainer.appendChild(tab);
    });
  }

  function selectCategory(catId) {
    activeCategoryId = catId;

    // Clear search input when switching categories
    var searchInput = document.getElementById('kb-search-input');
    if (searchInput && searchInput.value) {
      searchInput.value = '';
      var countEl = document.querySelector('.kb-search-count');
      if (countEl) countEl.classList.remove('visible');
      if (catTabsContainer) catTabsContainer.classList.remove('search-active');
    }

    // Update active tab UI state
    if (catTabsContainer) {
      catTabsContainer.querySelectorAll('.kb-cat-tab').forEach(function (tab) {
        if (tab.getAttribute('data-category') === catId) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
    }

    // Render topics inside the sidebar topics list
    renderTopicsList(catId);
  }

  /* ── Sidebar Topics List ─────────────────────────────────────── */
  function renderTopicsList(catId) {
    if (!topicsContainer || !currentManifest) return;
    topicsContainer.innerHTML = '';

    var categoriesToRender = [];
    if (catId === 'all') {
      categoriesToRender = currentManifest.categories;
    } else {
      var category = currentManifest.categories.find(function (c) {
        return c.id === catId;
      });
      if (category) categoriesToRender.push(category);
    }

    if (categoriesToRender.length === 0) return;

    categoriesToRender.forEach(function (category) {
      if (!category.groups) return;

      category.groups.forEach(function (group) {
        var groupEl = document.createElement('div');
        groupEl.className = 'kb-sidebar-group';

        var labelText = (catId === 'all') ? category.label + ' — ' + group.label : group.label;

        var groupLabel = document.createElement('div');
        groupLabel.className = 'kb-group-label';
        groupLabel.innerHTML =
          '<span class="kb-group-label-icon">' + (group.icon || '') + '</span>' +
          '<span class="kb-group-label-text">' + labelText + '</span>' +
          '<span class="kb-group-label-line"></span>';
        groupEl.appendChild(groupLabel);

        if (group.topics) {
          group.topics.forEach(function (topic) {
            var item = document.createElement('div');
            item.className = 'kb-topic-item';
            item.setAttribute('data-file', topic.file);

            item.innerHTML =
              '<button class="kb-topic-btn" type="button">' +
              '<span class="topic-dot"></span>' +
              '<span class="kb-topic-label">' + topic.label + '</span>' +
              '</button>';

            var btn = item.querySelector('.kb-topic-btn');

            if (activeFilePath === topic.file) {
              btn.classList.add('active');
            }

            btn.addEventListener('click', function () {
              if (!contentCache[topic.file] && typeof navigator !== 'undefined' && !navigator.onLine) {
                alert("You are currently offline. Please check your internet connection.");
                return;
              }
              // Remove active classes
              topicsContainer.querySelectorAll('.kb-topic-btn.active').forEach(function (b) {
                b.classList.remove('active');
              });
              btn.classList.add('active');

              selectTopic(topic.file, [category.label, group.label, topic.label]);
            });

            groupEl.appendChild(item);
          });
        }

        topicsContainer.appendChild(groupEl);
      });
    });
  }

  function updateActiveTopicHighlight() {
    if (!topicsContainer || !activeFilePath) return;
    topicsContainer.querySelectorAll('.kb-topic-item').forEach(function (item) {
      var btn = item.querySelector('.kb-topic-btn');
      if (item.getAttribute('data-file') === activeFilePath) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  /* ── Content View / Display Topic ────────────────────────────── */
  function selectTopic(filePath, breadcrumb) {
    activeFilePath = filePath;

    // Track topic view in Umami Analytics with a clean URL path
    var cleanUrl = '/kb/' + filePath.replace('.md', '');
    var topicTitle = breadcrumb ? breadcrumb[2] : filePath;
    trackPageView(cleanUrl, topicTitle);

    // Also track as a custom event so it shows in the "Events" tab on the Umami dashboard
    if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track(topicTitle, {
        file: filePath
      });
    }
    if (progressBar) {
      progressBar.style.width = '0%';
    }

    // Reset prefetch states on topic load
    prefetchedFile = null;
    prefetchInProgress = false;
    pendingNextNavigation = false;

    // Sync active sidebar button highlight (Feature 9 fix)
    updateActiveTopicHighlight();

    // Show Content view, hide placeholder
    if (contentPlaceholder) contentPlaceholder.classList.add('kb-hidden');
    if (contentInner) contentInner.classList.remove('kb-hidden');

    // Breadcrumb
    if (panelBreadcrumb) {
      renderBreadcrumb(panelBreadcrumb, breadcrumb);
    }

    // Handle Mobile drawer activation
    if (window.innerWidth <= 1024) {
      if (contentPanel) contentPanel.classList.add('open');
      if (backdropEl) backdropEl.classList.add('open');
      document.body.classList.add('kb-drawer-open');
    }

    // Loading State
    if (panelBody) {
      panelBody.innerHTML =
        '<div class="kb-loading">' +
        '<div class="kb-spinner"></div>' +
        '</div>';
    }

    // Fetch Content
    if (contentCache[filePath]) {
      renderMarkdown(panelBody, contentCache[filePath], filePath);
      return;
    }


    fetch(rawUrl(filePath))
      .then(function (res) {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then(function (md) {
        contentCache[filePath] = md;
        renderMarkdown(panelBody, md, filePath);
      })
      .catch(function () {
        panelBody.innerHTML =
          '<div style="text-align:center;padding:4rem 2rem;color:rgba(255,255,255,0.35);">' +
          '<div style="font-size:3.5rem;margin-bottom:1rem;">📝</div>' +
          '<div style="font-family:Inter,sans-serif;font-size:1.5rem;font-weight:600;margin-bottom:0.5rem;">Coming Soon</div>' +
          '<div style="font-family:Inter,sans-serif;font-size:1.2rem;">This topic is being written.</div>' +
          '</div>';
      });


    // Update URL hash
    if (history.replaceState) {
      history.replaceState(null, null, '#kb/' + encodeURIComponent(filePath.replace('.md', '')));
    }
  }

  function toggleZenMode() {
    var kbSection = document.getElementById('knowledge-base');
    if (!kbSection) return;

    var isZen = kbSection.classList.toggle('kb-zen-mode');
    document.body.classList.toggle('kb-zen-active', isZen);

    // Track toggle Zen mode in Umami
    if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track(isZen ? 'Enter Zen Mode' : 'Exit Zen Mode', {
        file: activeFilePath
      });
    }

    if (zenBtn) {
      var icon = zenBtn.querySelector('i');
      if (icon) {
        if (isZen) {
          icon.className = 'fa fa-compress';
          zenBtn.classList.add('active');
          zenBtn.title = 'Exit Fullscreen';
        } else {
          icon.className = 'fa fa-expand';
          zenBtn.classList.remove('active');
          zenBtn.title = 'Fullscreen Reader';
        }
      }
    }
  }

  function exitZenMode() {
    var kbSection = document.getElementById('knowledge-base');
    if (!kbSection || !kbSection.classList.contains('kb-zen-mode')) return;

    kbSection.classList.remove('kb-zen-mode');
    document.body.classList.remove('kb-zen-active');

    if (zenBtn) {
      var icon = zenBtn.querySelector('i');
      if (icon) {
        icon.className = 'fa fa-expand';
        zenBtn.classList.remove('active');
        zenBtn.title = 'Fullscreen Reader';
      }
    }
  }

  function closeTopic() {
    if (contentPanel) contentPanel.classList.remove('open');
    if (backdropEl) backdropEl.classList.remove('open');
    document.body.classList.remove('kb-drawer-open');

    // Keep activeFilePath set so that the sidebar highlight remains active,
    // but hide the content inner view to prevent the slide-in on scroll-resize
    if (contentPlaceholder) contentPlaceholder.classList.remove('kb-hidden');
    if (contentInner) contentInner.classList.add('kb-hidden');

    // Exit Zen Mode if active
    exitZenMode();

    // Clear hash
    if (history.replaceState) {
      history.replaceState(null, null, window.location.pathname);
    }
  }

  function renderBreadcrumb(container, items) {
    container.innerHTML = '';
    items.forEach(function (item, idx) {
      if (idx > 0) {
        var sep = document.createElement('span');
        sep.className = 'kb-breadcrumb-sep';
        sep.textContent = '›';
        container.appendChild(sep);
      }
      var span = document.createElement('span');
      span.className = 'kb-breadcrumb-item' + (idx === items.length - 1 ? ' active' : '');
      span.textContent = item;
      container.appendChild(span);
    });
  }

  /* ── Markdown Rendering ──────────────────────────────────────── */
  function renderMarkdown(container, markdown, filePath) {
    var html = '';

    if (typeof marked !== 'undefined') {
      try {
        html = marked.parse(markdown);
      } catch (e) {
        html = '<pre style="white-space:pre-wrap;color:#e4e4e7;">' + escapeHtml(markdown) + '</pre>';
      }
    } else {
      html = '<pre style="white-space:pre-wrap;color:#e4e4e7;">' + escapeHtml(markdown) + '</pre>';
    }

    container.innerHTML = '<div class="kb-markdown">' + html + '</div>';

    // Process Mermaid diagrams
    var mermaidBlocks = [];
    if (typeof mermaid !== 'undefined') {
      container.querySelectorAll('pre code.language-mermaid').forEach(function (block) {
        var pre = block.parentNode;
        var div = document.createElement('div');
        div.className = 'mermaid';
        div.textContent = block.textContent;
        pre.parentNode.replaceChild(div, pre);
        mermaidBlocks.push(div);
      });

      if (mermaidBlocks.length > 0) {
        try {
          mermaid.run({
            nodes: mermaidBlocks
          });
        } catch (err) {
          console.error('Mermaid render error:', err);
        }
      }
    }

    // Highlight code blocks
    if (typeof hljs !== 'undefined') {
      container.querySelectorAll('pre code').forEach(function (block) {
        if (block.classList.contains('language-mermaid')) return;
        hljs.highlightElement(block);
      });
    }

    // Wrap tables in scrollable container for mobile
    container.querySelectorAll('.kb-markdown table').forEach(function (table) {
      var wrapper = document.createElement('div');
      wrapper.className = 'kb-table-wrap';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });

    // Custom code headers with Copy buttons
    container.querySelectorAll('pre').forEach(function (pre) {
      var code = pre.querySelector('code');
      if (!code) return;

      var lang = '';
      var classes = code.className || '';
      var match = classes.match(/language-(\w+)/);
      if (match) lang = match[1];
      if (!match) {
        match = classes.match(/hljs\s+(\w+)/);
        if (match) lang = match[1];
      }

      var header = document.createElement('div');
      header.className = 'kb-code-header';
      header.innerHTML =
        '<span class="kb-code-lang">' + (lang || 'code') + '</span>' +
        '<button class="kb-copy-btn" type="button">' +
        '<span class="copy-text">Copy</span>' +
        '</button>';

      pre.insertBefore(header, pre.firstChild);

      header.querySelector('.kb-copy-btn').addEventListener('click', function () {
        var btn = this;
        var text = code.textContent;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(function () {
            btn.classList.add('copied');
            btn.querySelector('.copy-text').textContent = 'Copied!';
            setTimeout(function () {
              btn.classList.remove('copied');
              btn.querySelector('.copy-text').textContent = 'Copy';
            }, 2000);

            // Find the closest preceding heading element
            var subTopic = "";
            var sibling = pre.previousElementSibling;
            while (sibling) {
              if (/^H[1-6]$/i.test(sibling.tagName)) {
                subTopic = sibling.textContent.replace("🔗", "").trim();
                break;
              }
              sibling = sibling.previousElementSibling;
            }

            var activeBtn = topicsContainer.querySelector('.kb-topic-btn.active');
            var topicLabel = activeBtn ? activeBtn.querySelector('.kb-topic-label').textContent : '';

            var displayLabel;
            if (subTopic) {
              displayLabel = topicLabel ? (topicLabel + ' > ' + subTopic) : subTopic;
            } else {
              displayLabel = topicLabel || filePath;
            }

            // Track copied code event in Umami (labeled with the topic + sub-topic heading)
            if (window.umami && typeof window.umami.track === 'function') {
              window.umami.track('Copy Code: ' + displayLabel, {
                file: filePath
              });
            }
          });
        }
      });
    });

    // Create content footer
    var footer = document.createElement('div');
    footer.className = 'kb-content-footer';

    // View source link
    var sourceLink = document.createElement('a');
    sourceLink.className = 'kb-source-link';
    sourceLink.href = 'https://github.com/' + CONFIG.githubUser + '/' + CONFIG.githubRepo + '/blob/' + CONFIG.githubBranch + '/' + filePath;
    sourceLink.target = '_blank';
    sourceLink.rel = 'noopener';
    sourceLink.innerHTML = '📂 View source on GitHub';
    footer.appendChild(sourceLink);

    // Prev / Next Navigation Buttons (Feature 9)
    var topicItems = Array.from(topicsContainer.querySelectorAll('.kb-topic-item'));
    var index = topicItems.findIndex(function (item) {
      return item.getAttribute('data-file') === filePath;
    });

    if (index !== -1 && topicItems.length > 1) {
      var navContainer = document.createElement('div');
      navContainer.className = 'kb-nav-buttons';

      var prevItem = index > 0 ? topicItems[index - 1] : null;
      var nextItem = index < topicItems.length - 1 ? topicItems[index + 1] : null;

      if (prevItem) {
        var prevBtn = document.createElement('button');
        prevBtn.className = 'kb-nav-btn prev';
        prevBtn.type = 'button';
        prevBtn.innerHTML =
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.4rem; vertical-align: middle;">' +
          '<polyline points="15 18 9 12 15 6"></polyline>' +
          '</svg>' +
          '<span>' + escapeHtml(prevItem.querySelector('.kb-topic-label').textContent) + '</span>';

        prevBtn.addEventListener('click', function () {
          var sidebarBtn = prevItem.querySelector('.kb-topic-btn');
          if (sidebarBtn) sidebarBtn.click();
        });
        navContainer.appendChild(prevBtn);
      }

      if (nextItem) {
        var nextBtn = document.createElement('button');
        nextBtn.className = 'kb-nav-btn next';
        nextBtn.type = 'button';
        nextBtn.innerHTML =
          '<span>' + escapeHtml(nextItem.querySelector('.kb-topic-label').textContent) + '</span>' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 0.4rem; vertical-align: middle;">' +
          '<polyline points="9 18 15 12 9 6"></polyline>' +
          '</svg>';

        nextBtn.addEventListener('click', function () {
          var targetFile = nextItem.getAttribute('data-file');
          if (!contentCache[targetFile] && typeof navigator !== 'undefined' && !navigator.onLine) {
            pendingNextNavigation = true;
            alert("You are currently offline. We will automatically load the next topic as soon as your connection is restored.");
            return;
          }
          var sidebarBtn = nextItem.querySelector('.kb-topic-btn');
          if (sidebarBtn) sidebarBtn.click();
        });
        navContainer.appendChild(nextBtn);
      }

      footer.appendChild(navContainer);
    }

    var mdEl = container.querySelector('.kb-markdown');
    if (mdEl) mdEl.appendChild(footer);

    // Scroll container to top initially
    container.scrollTop = 0;

    // If a heading was deep linked, scroll to it after rendering
    if (targetHeadingId) {
      setTimeout(function () {
        var el = document.getElementById(targetHeadingId);
        if (el) {
          container.scrollTo({
            top: el.offsetTop - 20,
            behavior: 'smooth'
          });
        }
        targetHeadingId = null;
      }, 350);
    }
  }

  /* ── Search ──────────────────────────────────────────────────── */
  function setSearchIconMode(iconEl, mode) {
    if (!iconEl) return;
    var searchSvg = iconEl.querySelector('.kb-icon-search');
    var closeSvg = iconEl.querySelector('.kb-icon-close');
    if (!searchSvg || !closeSvg) return;

    if (mode === 'close') {
      searchSvg.style.display = 'none';
      closeSvg.style.display = 'block';
      iconEl.setAttribute('data-mode', 'close');
    } else {
      searchSvg.style.display = 'block';
      closeSvg.style.display = 'none';
      iconEl.setAttribute('data-mode', 'search');
    }
  }

  function initSearch() {
    var tab = document.querySelector('.kb-search-tab');
    var input = document.getElementById('kb-search-input');
    var countEl = document.querySelector('.kb-search-count');
    if (!input) return;

    if (tab) {
      var icon = tab.querySelector('.kb-search-icon');

      // Prevent input from losing focus when clicking the icon
      // This ensures our click logic can accurately detect if the input is active
      if (icon) {
        icon.addEventListener('mousedown', function (e) {
          e.preventDefault();
        });
      }

      tab.addEventListener('click', function (e) {
        // If clicking the icon specifically, toggle search state
        if (icon && icon.contains(e.target)) {
          if (input.value) {
            input.value = '';
            performSearch('', countEl);
          }
          if (document.activeElement === input) {
            input.blur();
          } else {
            input.focus();
          }
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (document.activeElement !== input) {
          input.focus();
        }
      });

      // Toggle icon visually on focus/blur
      input.addEventListener('focus', function () {
        setSearchIconMode(icon, 'close');
      });
      input.addEventListener('blur', function () {
        if (!input.value) setSearchIconMode(icon, 'search');
      });
    }

    // Handle Escape key to clear and blur the search
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (input.value) {
          input.value = '';
          performSearch('', countEl);
        }
        input.blur();
        e.stopPropagation();
      }
    });

    var timer;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        performSearch(input.value.trim().toLowerCase(), countEl);
      }, 180);
    });
  }

  function performSearch(query, countEl) {
    if (!topicsContainer || !currentManifest) return;

    if (query) {
      if (window.umami && typeof window.umami.track === 'function') {
        window.umami.track('Search: ' + query);
      }
    }

    var oldNoResults = topicsContainer.querySelector('.kb-no-results');
    if (oldNoResults) oldNoResults.remove();

    // Toggle search icon between search and close
    var icon = document.querySelector('.kb-search-tab .kb-search-icon');
    if (icon) {
      if (query || document.activeElement === document.getElementById('kb-search-input')) {
        setSearchIconMode(icon, 'close');
        if (query) icon.style.color = 'var(--kb-accent)';
        else icon.style.color = '';
      } else {
        setSearchIconMode(icon, 'search');
        icon.style.color = '';
      }
    }

    if (!query) {
      if (catTabsContainer) catTabsContainer.classList.remove('search-active');
      if (countEl) countEl.classList.remove('visible');
      selectCategory(activeCategoryId);
      return;
    }

    // Mark categories container as search active
    if (catTabsContainer) catTabsContainer.classList.add('search-active');

    topicsContainer.innerHTML = '';
    var totalMatches = 0;

    currentManifest.categories.forEach(function (category) {
      var catMatches = [];

      if (category.groups) {
        category.groups.forEach(function (group) {
          if (group.topics) {
            group.topics.forEach(function (topic) {
              var matchesLabel = topic.label.toLowerCase().indexOf(query) !== -1;
              var matchesGroup = group.label.toLowerCase().indexOf(query) !== -1;
              var matchesCat = category.label.toLowerCase().indexOf(query) !== -1;

              if (matchesLabel || matchesGroup || matchesCat) {
                catMatches.push({
                  category: category,
                  group: group,
                  topic: topic
                });
              }
            });
          }
        });
      }

      if (catMatches.length > 0) {
        totalMatches += catMatches.length;

        // Header for this category's search results
        var header = document.createElement('div');
        header.className = 'kb-search-cat-header';
        header.innerHTML = category.icon + ' ' + category.label;
        topicsContainer.appendChild(header);

        catMatches.forEach(function (match) {
          var item = document.createElement('div');
          item.className = 'kb-topic-item';
          item.setAttribute('data-file', match.topic.file);

          item.innerHTML =
            '<button class="kb-topic-btn" type="button">' +
            '<span class="topic-dot"></span>' +
            '<div class="kb-search-item-info">' +
            '<span class="kb-topic-label">' + match.topic.label + '</span>' +
            '<span class="kb-topic-sublabel">' + match.group.label + '</span>' +
            '</div>' +
            '</button>';

          var btn = item.querySelector('.kb-topic-btn');
          if (activeFilePath === match.topic.file) {
            btn.classList.add('active');
          }

          btn.addEventListener('click', function () {
            // Update activeCategoryId to the category of this topic
            activeCategoryId = match.category.id;

            // Sync category tabs active visual state
            if (catTabsContainer) {
              catTabsContainer.querySelectorAll('.kb-cat-tab').forEach(function (tab) {
                if (tab.getAttribute('data-category') === match.category.id) {
                  tab.classList.add('active');
                } else {
                  tab.classList.remove('active');
                }
              });
            }

            topicsContainer.querySelectorAll('.kb-topic-btn.active').forEach(function (b) {
              b.classList.remove('active');
            });
            btn.classList.add('active');
            selectTopic(match.topic.file, [match.category.label, match.group.label, match.topic.label]);
          });

          topicsContainer.appendChild(item);
        });
      }
    });

    if (countEl) {
      countEl.textContent = totalMatches + ' result' + (totalMatches !== 1 ? 's' : '');
      countEl.classList.add('visible');
    }

    if (totalMatches === 0) {
      var msg = document.createElement('div');
      msg.className = 'kb-no-results';
      msg.innerHTML =
        '<div class="kb-no-results-icon">🔍</div>' +
        '<div class="kb-no-results-text">No topics found for "' + escapeHtml(query) + '"</div>';
      topicsContainer.appendChild(msg);
    }
  }

  /* ── Entrance Animations ──────────────────────────────────────── */
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.kb-animate-in').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Micro-interaction: scroll category tabs slightly to hint horizontal scrollability
            if (entry.target.classList.contains('kb-cat-tabs') && !entry.target.classList.contains('kb-has-bounced')) {
              entry.target.classList.add('kb-has-bounced');
              setTimeout(function () {
                var maxScroll = entry.target.scrollWidth - entry.target.clientWidth;
                if (maxScroll > 15) {
                  var peekDistance = Math.min(200, maxScroll);
                  entry.target.scrollTo({ left: peekDistance, behavior: 'smooth' });
                  setTimeout(function () {
                    entry.target.scrollTo({ left: 0, behavior: 'smooth' });
                  }, 800);
                }
              }, 700); // Wait for entrance fade/slide-up animation to complete
            }
          }
        });
      },
      {
        rootMargin: '0px 0px 150px 0px',
        threshold: 0.01
      }
    );

    document.querySelectorAll('.kb-animate-in').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── Deep Hash Routing ────────────────────────────────────────── */
  function handleHashRoute() {
    var hash = window.location.hash;
    if (!hash || hash.indexOf('#kb/') !== 0) {
      trackPageView('/', 'Home');
      return;
    }

    var parts = hash.slice(4).split('#');
    var filePath = decodeURIComponent(parts[0]) + '.md';
    targetHeadingId = parts[1] || null;

    if (!currentManifest) return;

    var foundCat = null;
    var foundGroup = null;
    var foundTopic = null;

    currentManifest.categories.forEach(function (cat) {
      if (cat.groups) {
        cat.groups.forEach(function (g) {
          if (g.topics) {
            g.topics.forEach(function (t) {
              if (t.file === filePath) {
                foundCat = cat;
                foundGroup = g;
                foundTopic = t;
              }
            });
          }
        });
      }
    });

    if (foundTopic) {
      // Swapping tabs internally to correct category
      activeCategoryId = foundCat.id;
      selectCategory(activeCategoryId);

      // Trigger selection
      setTimeout(function () {
        selectTopic(foundTopic.file, [foundCat.label, foundGroup.label, foundTopic.label]);
        updateActiveTopicHighlight();

        var section = document.getElementById('knowledge-base');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }

  /* ── Prefetching & Retry Mechanism (Feature 19) ──────────────── */
  function getNextTopicFile() {
    if (!topicsContainer || !activeFilePath) return null;
    var topicItems = Array.from(topicsContainer.querySelectorAll('.kb-topic-item'));
    var index = topicItems.findIndex(function (item) {
      return item.getAttribute('data-file') === activeFilePath;
    });
    if (index !== -1 && index < topicItems.length - 1) {
      return topicItems[index + 1].getAttribute('data-file');
    }
    return null;
  }

  function triggerNextTopicPrefetch() {
    var nextFile = getNextTopicFile();
    if (!nextFile) return;

    if (prefetchedFile === nextFile || prefetchInProgress || contentCache[nextFile]) {
      return;
    }

    prefetchedFile = nextFile;
    prefetchInProgress = true;
    prefetchFileContent(nextFile);
  }

  function prefetchFileContent(filePath) {
    fetch(rawUrl(filePath))
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to prefetch');
        return res.text();
      })
      .then(function (md) {
        contentCache[filePath] = md;
        prefetchInProgress = false;

        // Auto-navigate if user clicked Next while offline and was waiting for this file
        if (pendingNextNavigation && activeFilePath !== filePath) {
          pendingNextNavigation = false;
          var topicItems = Array.from(topicsContainer.querySelectorAll('.kb-topic-item'));
          var nextItem = topicItems.find(function (item) {
            return item.getAttribute('data-file') === filePath;
          });
          if (nextItem) {
            var sidebarBtn = nextItem.querySelector('.kb-topic-btn');
            if (sidebarBtn) sidebarBtn.click();
          }
        }
      })
      .catch(function (err) {
        prefetchInProgress = false;
        console.warn("Prefetch failed for:", filePath, err);
      });
  }

  /* ── Initialization ──────────────────────────────────────────── */
  function init() {
    // Select elements
    catTabsContainer = document.querySelector('.kb-cat-tabs');
    topicsContainer = document.querySelector('.kb-topics-list-container');
    contentPanel = document.querySelector('.kb-content-panel');
    contentPlaceholder = document.querySelector('.kb-content-placeholder');
    contentInner = document.querySelector('.kb-content-inner');
    panelBody = document.querySelector('.kb-panel-body');
    panelBreadcrumb = document.querySelector('.kb-panel-breadcrumb');
    closeBtn = document.getElementById('kb-panel-close-btn');
    backdropEl = document.querySelector('.kb-drawer-backdrop');
    zenBtn = document.getElementById('kb-panel-zen-btn');
    progressBar = document.getElementById('kb-progress-bar');

    // Attach scroll listener to panelBody for reading progress bar (Feature 8)
    if (panelBody && progressBar) {
      panelBody.addEventListener('scroll', function () {
        var scrollTop = panelBody.scrollTop;
        var scrollHeight = panelBody.scrollHeight - panelBody.clientHeight;
        var progress = 0;
        if (scrollHeight > 0) {
          progress = (scrollTop / scrollHeight) * 100;
        }
        progressBar.style.width = progress + '%';

        // Trigger prefetch of the next topic at 75% scroll progress (Feature 19)
        if (progress >= 75) {
          triggerNextTopicPrefetch();
        }
      });
    }

    // Listen to browser online event for retrying prefetch (Feature 19)
    window.addEventListener('online', function () {
      var nextFile = getNextTopicFile();
      if (nextFile && !contentCache[nextFile] && !prefetchInProgress) {
        prefetchInProgress = true;
        prefetchFileContent(nextFile);
      }
    });

    // Initialize Mermaid
    if (typeof mermaid !== 'undefined') {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose'
      });
    }

    // Configure marked.js with custom renderer
    if (typeof marked !== 'undefined') {
      marked.use({
        renderer: {
          heading: function (text, level) {
            var rawText = text.replace(/<[^>]*>?/gm, '');
            var id = rawText.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, '');
            var svgLink = '<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
            return '<h' + level + ' id="' + id + '" class="kb-heading">' +
              text +
              '<a href="#' + id + '" class="kb-heading-anchor" onclick="copyHeadingLink(event, \'' + id + '\')">' + svgLink + '</a>' +
              '</h' + level + '>\n';
          }
        }
      });
    }

    // Close button / Backdrop for mobile
    if (closeBtn) {
      closeBtn.addEventListener('click', closeTopic);
    }
    if (backdropEl) {
      backdropEl.addEventListener('click', closeTopic);
    }
    if (zenBtn) {
      zenBtn.addEventListener('click', toggleZenMode);
    }

    // Escape listener
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var kbSection = document.getElementById('knowledge-base');
        if (kbSection && kbSection.classList.contains('kb-zen-mode')) {
          toggleZenMode();
        } else if (contentPanel && contentPanel.classList.contains('open')) {
          closeTopic();
        }
      }
    });

    // Resize listener (Bug 8 / Enhancement 9)
    window.addEventListener('resize', debounce(function () {
      if (window.innerWidth > 1024) {
        // If resized to desktop, remove mobile drawer locks
        document.body.classList.remove('kb-drawer-open');
        if (backdropEl) backdropEl.classList.remove('open');
        if (contentPanel) contentPanel.classList.remove('open');
      } else if (activeFilePath && contentInner && !contentInner.classList.contains('kb-hidden')) {
        // If resized down to mobile and a topic is active, re-apply mobile drawer locks
        if (contentPanel) contentPanel.classList.add('open');
        if (backdropEl) backdropEl.classList.add('open');
        document.body.classList.add('kb-drawer-open');
      }
    }, 150));

    // Keyboard Navigation (Feature 4)
    if (topicsContainer) {
      topicsContainer.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();
          var buttons = Array.from(topicsContainer.querySelectorAll('.kb-topic-btn'));
          if (buttons.length === 0) return;

          var index = buttons.indexOf(document.activeElement);
          if (index === -1) {
            buttons[0].focus();
            return;
          }

          if (e.key === 'ArrowDown') {
            var nextIndex = (index + 1) % buttons.length;
            buttons[nextIndex].focus();
          } else if (e.key === 'ArrowUp') {
            var prevIndex = index - 1;
            if (prevIndex < 0) prevIndex = buttons.length - 1;
            buttons[prevIndex].focus();
          }
        }
      });
    }

    // Load Manifest

    var manifestUrl = 'https://raw.githubusercontent.com/' + CONFIG.githubUser + '/' + CONFIG.githubRepo + '/' + CONFIG.githubBranch + '/manifest.json';
    fetch(manifestUrl)
      .then(function (res) { return res.json(); })
      .then(function (manifest) {
        currentManifest = manifest;
        activeCategoryId = 'all';
        renderCategoryTabs(currentManifest);
        selectCategory(activeCategoryId);
        handleHashRoute();
      })
      .catch(function (err) {
        console.error("Failed to load manifest:", err);
        var topicsContainer = document.querySelector('.kb-topics-list-container');
        if (topicsContainer) topicsContainer.innerHTML = '<div style="padding: 1rem; color: #ff6b6b;">Failed to load data from GitHub. Make sure the repository exists and is public.</div>';
      });

    initSearch();
    initScrollAnimations();

    // Listen to hash change manually
    window.addEventListener('hashchange', handleHashRoute);
  }

  // DOM Content Loaded wrapper
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
