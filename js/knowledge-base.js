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
    useDemoData: true, // Set false once your GitHub repo is ready
  };

  /* ── Demo Manifest (flat topics per category) ────────────────── */
  var DEMO_MANIFEST = {
    categories: [
      {
        id: 'devops',
        label: 'DevOps',
        icon: '🔧',
        description: 'Infrastructure, automation & cloud engineering',
        groups: [
          {
            label: 'Docker',
            icon: '🐳',
            topics: [
              { id: 'docker-basics', label: 'Docker Basics', file: 'devops/docker/basics.md' },
              { id: 'docker-compose', label: 'Docker Compose', file: 'devops/docker/compose.md' },
              { id: 'docker-best-practices', label: 'Best Practices', file: 'devops/docker/best-practices.md' },
            ],
          },
          {
            label: 'Kubernetes',
            icon: '☸️',
            topics: [
              { id: 'k8s-architecture', label: 'K8s Architecture', file: 'devops/kubernetes/architecture.md' },
              { id: 'k8s-pods', label: 'Pods & Services', file: 'devops/kubernetes/pods-and-services.md' },
              { id: 'k8s-helm', label: 'Helm Charts', file: 'devops/kubernetes/helm.md' },
            ],
          },
          {
            label: 'CI/CD',
            icon: '🔄',
            topics: [
              { id: 'jenkins', label: 'Jenkins', file: 'devops/ci-cd/jenkins.md' },
              { id: 'github-actions', label: 'GitHub Actions', file: 'devops/ci-cd/github-actions.md' },
              { id: 'gitlab-ci', label: 'GitLab CI', file: 'devops/ci-cd/gitlab-ci.md' },
            ],
          },
          {
            label: 'Terraform',
            icon: '🏗️',
            topics: [
              { id: 'tf-basics', label: 'Terraform Basics', file: 'devops/terraform/basics.md' },
              { id: 'tf-modules', label: 'Modules & State', file: 'devops/terraform/modules.md' },
            ],
          },
          {
            label: 'Linux',
            icon: '🐧',
            topics: [
              { id: 'linux-commands', label: 'Essential Commands', file: 'devops/linux/commands.md' },
              { id: 'shell-scripting', label: 'Shell Scripting', file: 'devops/linux/shell-scripting.md' },
            ],
          },
          {
            label: 'Monitoring',
            icon: '📊',
            topics: [
              { id: 'prometheus', label: 'Prometheus', file: 'devops/monitoring/prometheus.md' },
              { id: 'grafana', label: 'Grafana', file: 'devops/monitoring/grafana.md' },
            ],
          },
        ],
      },
      {
        id: 'media-creative',
        label: 'Media & Arts',
        icon: '🎨',
        description: 'Photography, videography, and creative storytelling',
        groups: [
          {
            label: 'Camera & Composition',
            icon: '📸',
            topics: [
              { id: 'camera-settings', label: 'Camera Settings', file: 'videography/camera-settings.md' },
              { id: 'stabilization', label: 'Stabilization', file: 'videography/stabilization.md' },
              { id: 'rule-of-thirds', label: 'Rule of Thirds', file: 'photography/composition.md' },
              { id: 'leading-lines', label: 'Leading Lines', file: 'photography/leading-lines.md' },
            ],
          },
          {
            label: 'Editing & Processing',
            icon: '✂️',
            topics: [
              { id: 'editing-workflow', label: 'Editing Workflow', file: 'videography/editing-workflow.md' },
              { id: 'color-grading', label: 'Color Grading', file: 'videography/color-grading.md' },
              { id: 'lightroom', label: 'Lightroom Tips', file: 'photography/lightroom-tips.md' },
            ],
          },
        ],
      },
      {
        id: 'audiophile',
        label: 'Audiophile',
        icon: '🎧',
        description: 'High-fidelity audio & sound gear',
        groups: [
          {
            label: 'Headphones',
            icon: '🎵',
            topics: [
              { id: 'headphone-guide', label: 'Headphone Guide', file: 'audiophile/headphone-guide.md' },
              { id: 'iems', label: 'IEMs', file: 'audiophile/iems.md' },
            ],
          },
          {
            label: 'DACs & Amps',
            icon: '🔊',
            topics: [
              { id: 'dac-amp-basics', label: 'DAC/Amp Basics', file: 'audiophile/dac-amp-basics.md' },
            ],
          },
        ],
      },
      {
        id: 'motorbikes',
        label: 'Motorbikes',
        icon: '🏍️',
        description: 'Rides, maintenance & motorcycle culture',
        groups: [
          {
            label: 'Maintenance',
            icon: '🔩',
            topics: [
              { id: 'basic-maintenance', label: 'Basic Maintenance', file: 'motorbikes/maintenance.md' },
            ],
          },
          {
            label: 'Gear & Safety',
            icon: '🪖',
            topics: [
              { id: 'riding-gear', label: 'Riding Gear Guide', file: 'motorbikes/gear-guide.md' },
            ],
          },
        ],
      },
    ],
  };

  /* ── Demo Markdown Content ───────────────────────────────────── */
  var DEMO_CONTENT = {
    'devops/docker/basics.md': '# Docker Basics\n\nDocker is a platform for developing, shipping, and running applications in **containers** — lightweight, portable, and self-sufficient environments.\n\n## Why Docker?\n\n- **Consistency** — Works the same in dev, staging, and production\n- **Isolation** — Each container runs independently\n- **Speed** — Containers start in seconds, not minutes\n- **Efficiency** — Share the host OS kernel, less overhead than VMs\n\n## Key Concepts\n\n| Concept | Description |\n|---------|-------------|\n| **Image** | A read-only template with instructions for creating a container |\n| **Container** | A runnable instance of an image |\n| **Dockerfile** | A text file with instructions to build an image |\n| **Registry** | A storage and distribution system for images (e.g., Docker Hub) |\n\n## Essential Commands\n\n```bash\n# Pull an image from Docker Hub\ndocker pull nginx:latest\n\n# Run a container\ndocker run -d --name my-nginx -p 8080:80 nginx:latest\n\n# List running containers\ndocker ps\n\n# View container logs\ndocker logs my-nginx\n\n# Stop and remove a container\ndocker stop my-nginx\ndocker rm my-nginx\n\n# Build an image from a Dockerfile\ndocker build -t my-app:1.0 .\n```\n\n## Dockerfile Example\n\n```dockerfile\nFROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD [\"node\", \"server.js\"]\n```\n\n> **Pro Tip:** Always use specific image tags (e.g., `node:18-alpine`) instead of `latest` in production to ensure reproducible builds.\n',

    'devops/docker/compose.md': '# Docker Compose\n\nDocker Compose is a tool for defining and running **multi-container** Docker applications using a YAML configuration file.\n\n## Why Compose?\n\n- Define your entire application stack in a single file\n- Start all services with one command\n- Manage networking between containers automatically\n- Perfect for local development and testing\n\n## docker-compose.yml Example\n\n```yaml\nversion: \'3.8\'\n\nservices:\n  web:\n    build: ./frontend\n    ports:\n      - \"3000:3000\"\n    depends_on:\n      - api\n    environment:\n      - API_URL=http://api:8080\n\n  api:\n    build: ./backend\n    ports:\n      - \"8080:8080\"\n    depends_on:\n      - db\n    environment:\n      - DATABASE_URL=postgres://user:pass@db:5432/mydb\n\n  db:\n    image: postgres:15-alpine\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n    environment:\n      - POSTGRES_USER=user\n      - POSTGRES_PASSWORD=pass\n      - POSTGRES_DB=mydb\n\nvolumes:\n  pgdata:\n```\n\n## Essential Commands\n\n```bash\n# Start all services\ndocker-compose up -d\n\n# View logs\ndocker-compose logs -f\n\n# Stop all services\ndocker-compose down\n\n# Rebuild and restart\ndocker-compose up -d --build\n\n# Scale a service\ndocker-compose up -d --scale web=3\n```\n',

    'devops/docker/best-practices.md': '# Docker Best Practices\n\n## Image Optimization\n\n1. **Use multi-stage builds** to reduce image size\n2. **Use `.dockerignore`** to exclude unnecessary files\n3. **Order layers by change frequency** — put rarely-changing layers first\n4. **Use specific base image tags** — never `latest` in production\n\n```dockerfile\n# Multi-stage build example\nFROM node:18-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html\nEXPOSE 80\n```\n\n## Security\n\n- **Don\'t run as root** — use `USER` directive\n- **Scan images** — `docker scout`, `trivy`\n- **Use read-only filesystems** where possible\n- **Never store secrets in images** — use env vars or secrets management\n\n## Resource Management\n\n```bash\n# Limit container resources\ndocker run -d \\\n  --memory=\"256m\" \\\n  --cpus=\"0.5\" \\\n  --restart=unless-stopped \\\n  my-app:1.0\n```\n',

    'devops/kubernetes/architecture.md': '# Kubernetes Architecture\n\nKubernetes (K8s) is an open-source container orchestration platform.\n\n## Control Plane Components\n\n| Component | Role |\n|-----------|------|\n| **kube-apiserver** | Frontend for the K8s control plane |\n| **etcd** | Key-value store for cluster data |\n| **kube-scheduler** | Assigns pods to nodes |\n| **kube-controller-manager** | Runs controller processes |\n\n## Node Components\n\n| Component | Role |\n|-----------|------|\n| **kubelet** | Ensures containers are running in a Pod |\n| **kube-proxy** | Maintains network rules |\n| **Container Runtime** | Runs containers (e.g., containerd) |\n\n## Architecture Overview\n\n```\n┌─────────────────────────────────────┐\n│         Control Plane               │\n│  ┌──────────┐  ┌──────┐            │\n│  │API Server│  │ etcd │            │\n│  └──────────┘  └──────┘            │\n│  ┌──────────────────────────┐      │\n│  │ Scheduler + Controllers  │      │\n│  └──────────────────────────┘      │\n├─────────────────────────────────────┤\n│         Worker Nodes                │\n│  ┌───────────┐  ┌───────────┐      │\n│  │  Node 1   │  │  Node 2   │      │\n│  │ kubelet   │  │ kubelet   │      │\n│  │ Pod  Pod  │  │ Pod  Pod  │      │\n│  └───────────┘  └───────────┘      │\n└─────────────────────────────────────┘\n```\n\n## Key Concepts\n\n- **Pod** — Smallest deployable unit\n- **Service** — Stable network endpoint for Pods\n- **Deployment** — Declarative updates for Pods\n- **Namespace** — Virtual clusters within a cluster\n',

    'devops/kubernetes/pods-and-services.md': '# Pods & Services\n\n## Pods\n\nA Pod is the **smallest deployable unit** in Kubernetes.\n\n```yaml\napiVersion: v1\nkind: Pod\nmetadata:\n  name: my-app\n  labels:\n    app: my-app\nspec:\n  containers:\n    - name: app\n      image: my-app:1.0\n      ports:\n        - containerPort: 8080\n      resources:\n        requests:\n          memory: \"128Mi\"\n          cpu: \"250m\"\n        limits:\n          memory: \"256Mi\"\n          cpu: \"500m\"\n```\n\n## Services\n\n| Type | Description |\n|------|-------------|\n| **ClusterIP** | Internal-only access (default) |\n| **NodePort** | Exposes on each node\'s IP |\n| **LoadBalancer** | Cloud load balancer |\n| **ExternalName** | Maps to a DNS name |\n\n```yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: my-app-service\nspec:\n  type: ClusterIP\n  selector:\n    app: my-app\n  ports:\n    - port: 80\n      targetPort: 8080\n```\n',

    'devops/kubernetes/helm.md': '# Helm Charts\n\nHelm is the **package manager for Kubernetes**.\n\n## Key Concepts\n\n- **Chart** — A package of K8s resources\n- **Release** — A running instance of a chart\n- **Repository** — A collection of charts\n- **Values** — Configuration to customize a chart\n\n## Commands\n\n```bash\nhelm repo add bitnami https://charts.bitnami.com/bitnami\nhelm search repo nginx\nhelm install my-release bitnami/nginx\nhelm list\nhelm upgrade my-release bitnami/nginx --set replicaCount=3\nhelm uninstall my-release\n```\n\n## Creating Your Own Chart\n\n```bash\nhelm create my-chart\n\n# Structure\nmy-chart/\n├── Chart.yaml\n├── values.yaml\n├── templates/\n│   ├── deployment.yaml\n│   ├── service.yaml\n│   └── ingress.yaml\n└── charts/\n```\n',

    'devops/ci-cd/github-actions.md': '# GitHub Actions\n\nCI/CD platform built into GitHub.\n\n```yaml\nname: CI/CD Pipeline\n\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Setup Node\n        uses: actions/setup-node@v4\n        with:\n          node-version: \'18\'\n      - run: npm ci\n      - run: npm test\n      - run: npm run build\n\n  deploy:\n    needs: build\n    runs-on: ubuntu-latest\n    if: github.ref == \'refs/heads/main\'\n    steps:\n      - run: echo \"Deploying...\"\n```\n',

    'devops/ci-cd/jenkins.md': '# Jenkins\n\nOpen-source automation server.\n\n```groovy\npipeline {\n    agent any\n    stages {\n        stage(\'Build\') {\n            steps { sh \'npm ci && npm run build\' }\n        }\n        stage(\'Test\') {\n            steps { sh \'npm test\' }\n        }\n        stage(\'Deploy\') {\n            when { branch \'main\' }\n            steps { sh \'kubectl apply -f k8s/\' }\n        }\n    }\n}\n```\n',

    'devops/ci-cd/gitlab-ci.md': '# GitLab CI/CD\n\nUses `.gitlab-ci.yml` in your repository root.\n\n```yaml\nstages:\n  - build\n  - test\n  - deploy\n\nbuild:\n  stage: build\n  image: docker:latest\n  script:\n    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .\n    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA\n\ntest:\n  stage: test\n  image: node:18\n  script:\n    - npm ci\n    - npm test\n\ndeploy:\n  stage: deploy\n  script:\n    - kubectl set image deployment/app app=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA\n  only:\n    - main\n  when: manual\n```\n',

    'devops/terraform/basics.md': '# Terraform Basics\n\nInfrastructure as Code (IaC) tool.\n\n## Core Workflow\n\n```bash\nterraform init      # Download providers\nterraform plan      # Preview changes\nterraform apply     # Apply changes\nterraform destroy   # Tear down\n```\n\n## HCL Example\n\n```hcl\nprovider \"aws\" {\n  region = \"us-east-1\"\n}\n\nresource \"aws_instance\" \"web\" {\n  ami           = \"ami-0c55b159cbfafe1f0\"\n  instance_type = var.instance_type\n  tags = { Name = \"web-server\" }\n}\n\nvariable \"instance_type\" {\n  default = \"t3.micro\"\n}\n\noutput \"instance_ip\" {\n  value = aws_instance.web.public_ip\n}\n```\n\n| Concept | Description |\n|---------|-------------|\n| **Provider** | Cloud/service API plugin |\n| **Resource** | Infrastructure component |\n| **Variable** | Parameterized input |\n| **Output** | Values shown after apply |\n| **State** | Config ↔ real-world mapping |\n',

    'devops/terraform/modules.md': '# Terraform Modules & State\n\n## Modules\n\nReusable packages of Terraform config.\n\n```hcl\nmodule \"vpc\" {\n  source       = \"./modules/vpc\"\n  cidr_block   = \"10.0.0.0/16\"\n  environment  = \"production\"\n}\n\nmodule \"eks\" {\n  source  = \"terraform-aws-modules/eks/aws\"\n  version = \"~> 19.0\"\n  vpc_id  = module.vpc.vpc_id\n}\n```\n\n## Remote State\n\n```hcl\nterraform {\n  backend \"s3\" {\n    bucket         = \"my-terraform-state\"\n    key            = \"prod/terraform.tfstate\"\n    region         = \"us-east-1\"\n    dynamodb_table = \"terraform-locks\"\n    encrypt        = true\n  }\n}\n```\n\n> **Important:** Never commit `terraform.tfstate` to version control.\n',

    'devops/linux/commands.md': '# Essential Linux Commands\n\n## File System\n\n```bash\npwd                    # Print working directory\nls -la                 # List all files\nfind / -name \"*.log\"   # Find files\ntree -L 2              # Directory tree\ndu -sh *               # Disk usage\ndf -h                  # Disk space\n```\n\n## Text Processing\n\n```bash\ngrep -r \"pattern\" .          # Recursive search\nawk \'{print $1, $3}\' file    # Print columns\nsed \'s/old/new/g\' file       # Find & replace\ntail -f /var/log/syslog      # Follow log\nwc -l file                   # Count lines\n```\n\n## Process Management\n\n```bash\nps aux                       # List processes\nkill -9 <PID>                # Force kill\nsystemctl status nginx       # Service status\njournalctl -u nginx -f       # Service logs\n```\n\n## Networking\n\n```bash\nip addr show                 # Show IPs\nss -tulnp                    # Listening ports\ncurl -I https://example.com  # HTTP headers\ndig example.com              # DNS lookup\n```\n',

    'devops/linux/shell-scripting.md': '# Shell Scripting\n\n## Template\n\n```bash\n#!/bin/bash\nset -euo pipefail\n\nAPP_NAME=\"my-app\"\nlog() { echo \"[$(date \'+%Y-%m-%d %H:%M:%S\')] $1\"; }\nlog \"Starting $APP_NAME\"\n```\n\n## Control Structures\n\n```bash\n# If/else\nif [ -f \"/path/to/file\" ]; then\n  echo \"File exists\"\nfi\n\n# For loop\nfor server in web-{1..5}; do\n  ssh \"$server\" \'sudo systemctl restart nginx\'\ndone\n\n# While loop\nwhile read -r line; do\n  echo \"Processing: $line\"\ndone < input.txt\n```\n\n## Useful Patterns\n\n```bash\n# Check if command exists\ncommand -v docker >/dev/null 2>&1 || { echo \"Docker required\"; exit 1; }\n\n# Trap for cleanup\ntrap \'rm -f /tmp/lockfile\' EXIT\n```\n',

    'devops/monitoring/prometheus.md': '# Prometheus\n\nOpen-source monitoring and alerting toolkit.\n\n## Config\n\n```yaml\nglobal:\n  scrape_interval: 15s\n\nscrape_configs:\n  - job_name: \'node-exporter\'\n    static_configs:\n      - targets: [\'localhost:9100\']\n  - job_name: \'app\'\n    metrics_path: \'/metrics\'\n    static_configs:\n      - targets: [\'app:8080\']\n```\n\n## PromQL\n\n```promql\n# CPU usage\n100 - (avg by(instance) (rate(node_cpu_seconds_total{mode=\"idle\"}[5m])) * 100)\n\n# HTTP request rate\nrate(http_requests_total[5m])\n\n# 99th percentile latency\nhistogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))\n```\n',

    'devops/monitoring/grafana.md': '# Grafana\n\nAnalytics and visualization platform.\n\n## Key Features\n\n- **Dashboards** — Rich visualizations\n- **Data Sources** — Prometheus, InfluxDB, Elasticsearch, etc.\n- **Alerting** — Built-in alert rules\n- **Templating** — Dynamic dashboards with variables\n\n## Dashboard as Code\n\n```json\n{\n  \"dashboard\": {\n    \"title\": \"Application Metrics\",\n    \"panels\": [\n      {\n        \"title\": \"Request Rate\",\n        \"type\": \"graph\",\n        \"targets\": [\n          {\n            \"expr\": \"rate(http_requests_total[5m])\",\n            \"legendFormat\": \"{{method}} {{status}}\"\n          }\n        ]\n      }\n    ]\n  }\n}\n```\n\n> **Tip:** Use Grafana provisioning to manage dashboards as code in Git.\n',

    'videography/camera-settings.md': '# Camera Settings\n\nEssential settings for videography.\n\n## The Exposure Triangle\n- **Aperture**: Depth of field.\n- **Shutter Speed**: Motion blur (180-degree shutter rule).\n- **ISO**: Sensor sensitivity.\n',
    'photography/composition.md': '# Composition Techniques\n\n- Rule of Thirds\n- Leading Lines\n- Symmetry\n- Framing\n',
    'audiophile/headphones.md': '# Headphones Guide\n\n- Open-back vs Closed-back\n- Planar Magnetic vs Dynamic Drivers\n- Impedance and Sensitivity\n',
    'audiophile/dacs.md': '# DACs & Amps\n\nDigital-to-Analog Converters and Amplifiers.\n\n> A clean source makes all the difference.\n',
    'motorbikes/maintenance.md': '# Basic Maintenance\n\n- Chain cleaning and lubrication\n- Oil changes\n- Tire pressure monitoring\n',
    'motorbikes/gear-guide.md': '# Riding Gear\n\n- Helmets (ECE 22.06 rating)\n- Jackets (AA/AAA abrasion resistance)\n- Gloves & Boots\n',
  };

  /* ── State variables ─────────────────────────────────────────── */
  var currentManifest = null;
  var activeCategoryId = null;
  var activeFilePath = null;
  var targetHeadingId = null;
  var contentCache = {};

  /* ── DOM Selectors ───────────────────────────────────────────── */
  var catTabsContainer, topicsContainer, contentPanel, contentPlaceholder, contentInner, panelBody, panelBreadcrumb, closeBtn, backdropEl, zenBtn;

  /* ── Utilities ───────────────────────────────────────────────── */
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }

  window.copyHeadingLink = function(e, id) {
    e.preventDefault();
    if (!activeFilePath) return;
    
    var baseUrl = window.location.href.split('#')[0];
    var pathStr = '#kb/' + encodeURIComponent(activeFilePath.replace('.md', ''));
    var fullLink = baseUrl + pathStr + '#' + id;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullLink).then(function() {
        var target = e.currentTarget;
        target.classList.add('copied');
        setTimeout(function() {
          target.classList.remove('copied');
        }, 1500);
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

    categoriesToRender.forEach(function(category) {
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

    if (CONFIG.useDemoData && DEMO_CONTENT[filePath]) {
      setTimeout(function () {
        contentCache[filePath] = DEMO_CONTENT[filePath];
        renderMarkdown(panelBody, DEMO_CONTENT[filePath], filePath);
      }, 200);
    } else {
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
    }

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

    // Highlight code blocks
    if (typeof hljs !== 'undefined') {
      container.querySelectorAll('pre code').forEach(function (block) {
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
          });
        }
      });
    });

    // View source link
    var sourceLink = document.createElement('a');
    sourceLink.className = 'kb-source-link';
    sourceLink.href = 'https://github.com/' + CONFIG.githubUser + '/' + CONFIG.githubRepo + '/blob/' + CONFIG.githubBranch + '/' + filePath;
    sourceLink.target = '_blank';
    sourceLink.rel = 'noopener';
    sourceLink.innerHTML = '📂 View source on GitHub';
    
    var mdEl = container.querySelector('.kb-markdown');
    if (mdEl) mdEl.appendChild(sourceLink);

    // Scroll container to top initially
    container.scrollTop = 0;
    
    // If a heading was deep linked, scroll to it after rendering
    if (targetHeadingId) {
      setTimeout(function() {
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
        icon.addEventListener('mousedown', function(e) {
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
          }
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll('.kb-animate-in').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── Deep Hash Routing ────────────────────────────────────────── */
  function handleHashRoute() {
    var hash = window.location.hash;
    if (!hash || hash.indexOf('#kb/') !== 0) return;

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

    // Configure marked.js with custom renderer
    if (typeof marked !== 'undefined') {
      marked.use({
        renderer: {
          heading: function(text, level) {
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
      topicsContainer.addEventListener('keydown', function(e) {
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
    if (CONFIG.useDemoData) {
      currentManifest = DEMO_MANIFEST;
      activeCategoryId = 'all';
      renderCategoryTabs(currentManifest);
      selectCategory(activeCategoryId);
      handleHashRoute();
    } else {
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
        .catch(function () {
          currentManifest = DEMO_MANIFEST;
          activeCategoryId = 'all';
          renderCategoryTabs(currentManifest);
          selectCategory(activeCategoryId);
          handleHashRoute();
        });
    }

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
