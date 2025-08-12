Param([string]$Root = $PSScriptRoot)

$ErrorActionPreference = 'Stop'
Set-Location $Root

# Read products.html and find service names and descriptions
$htmlPath = Join-Path $Root 'products.html'
if (-not (Test-Path $htmlPath)) { throw "products.html not found at $htmlPath" }

$html = Get-Content -Raw -Encoding UTF8 $htmlPath
$pattern = '<div class="service-item">[\s\S]*?<h4>(?<name>.*?)</h4>[\s\S]*?<p>(?<desc>.*?)</p>'
$pattern = '<div class="service-item">[\s\S]*?<h4>(?<name>.*?)</h4>[\s\S]*?<p>(?<desc>.*?)</p>'
# Use proper quoting for PowerShell: single-quoted string with real quotes in HTML
$pattern = '<div class="service-item">[\s\S]*?<h4>(?<name>.*?)</h4>[\s\S]*?<p>(?<desc>.*?)</p>'
$pattern = '<div class="service-item">[\s\S]*?<h4>(?<name>.*?)</h4>[\s\S]*?<p>(?<desc>.*?)</p>'
# Final pattern (no backslash-escaped quotes)
$pattern = '<div class="service-item">[\s\S]*?<h4>(?<name>.*?)</h4>[\s\S]*?<p>(?<desc>.*?)</p>'

# Actually assign correct literal (PowerShell single quotes treat backslashes literally)
$pattern = '<div class="service-item">[\s\S]*?<h4>(?<name>.*?)</h4>[\s\S]*?<p>(?<desc>.*?)</p>'

# Simpler and correct: use single quotes and no backslashes for quotes
$pattern = '<div class="service-item">[\s\S]*?<h4>(?<name>.*?)</h4>[\s\S]*?<p>(?<desc>.*?)</p>'
$matches = [regex]::Matches($html, $pattern)

if ($matches.Count -eq 0) {
  Write-Output 'No service items found in products.html. Nothing to do.'
  exit 0
}

$created = 0
$nameToSlug = @{}

foreach ($m in $matches) {
  $name = ($m.Groups['name'].Value -replace '\s+', ' ').Trim()
  $desc = ($m.Groups['desc'].Value -replace '\s+', ' ').Trim()

  # Build slug
  $slug = $name.ToLower()
  $slug = $slug -replace '&', 'and'
  $slug = $slug -replace 'â€“', '-'
  $slug = $slug -replace '[^a-z0-9]+', '-'
  $slug = $slug -replace '^-|-$', ''

  if (-not $nameToSlug.ContainsKey($name)) { $nameToSlug[$name] = $slug }

  $file = Join-Path $Root ("$slug.html")
  if (-not (Test-Path $file)) {
    $title = "$name | NovaMind AI"
    $year = (Get-Date).Year
    $content = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>$title</title>
  <meta name="description" content="$desc"/>
  <link rel="stylesheet" href="style.css"/>
  <link rel="stylesheet" href="products.css"/>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  <header class="clean-navbar">
    <div class="navbar-inner">
      <div class="navbar-brand"><a href="index.html" class="company-name">NovaMind AI</a></div>
      <nav class="main-nav" aria-label="Main Navigation">
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="solutions.html">Solutions</a></li>
          <li><a href="products.html" class="active">Products</a></li>
          <li><a href="demo.html">Demo</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="career.html">Career</a></li>
          <li><a href="contact.html" class="contact-btn">Contact Us</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="main">
    <section class="hero-section" style="min-height:auto;padding:80px 0;">
      <div class="container">
        <div class="hero-content" style="max-width:860px;margin:0 auto;text-align:center;">
          <div class="hero-badge"><i class="fas fa-sparkles"></i><span>AI Service</span></div>
          <h1 class="hero-title" style="font-size:2.75rem;">$name</h1>
          <p class="hero-description">$desc</p>
          <div class="hero-actions">
            <a href="products.html#products" class="btn-secondary"><i class="fas fa-arrow-left"></i> Back to Products</a>
            <a href="contact.html" class="btn-primary"><i class="fas fa-paper-plane"></i> Talk to an expert</a>
          </div>
        </div>
      </div>
    </section>

    <section class="products-overview" style="padding:60px 0;">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Overview</span>
          <h2>What you get</h2>
          <p>Production-grade implementation with security, scalability, and measurable ROI.</p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <i class="fas fa-bolt"></i>
            <h4>Fast deployment</h4>
            <p>Go live quickly using accelerators and best-practice blueprints.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-shield-alt"></i>
            <h4>Security-first</h4>
            <p>Encryption, role-based access, logging, and compliance controls.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-diagram-project"></i>
            <h4>Seamless integration</h4>
            <p>Robust APIs and connectors for your apps, data, and workflows.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <div class="cta-text">
            <h2>Ready to implement $name?</h2>
            <p>We design, deploy, and support enterprise AI with guaranteed outcomes.</p>
            <div class="cta-features">
              <div class="feature"><i class="fas fa-check"></i><span>Solution design workshop</span></div>
              <div class="feature"><i class="fas fa-check"></i><span>Pilot in 2–4 weeks</span></div>
              <div class="feature"><i class="fas fa-check"></i><span>Operationalization and success</span></div>
            </div>
          </div>
          <div class="cta-actions">
            <a class="btn-primary" href="contact.html">Get a proposal</a>
            <a class="btn-secondary" href="demo.html">See a demo</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-bottom">
        <div>© $year NovaMind AI</div>
        <div class="footer-links">
          <a href="privacy.html">Privacy</a>
          <a href="terms.html">Terms</a>
        </div>
      </div>
    </div>
  </footer>

  <script src="products.js"></script>
</body>
  </html>
"@
    Set-Content -Path $file -Encoding UTF8 -Value $content
    $created++
  }
}

# Link service names on products page to their pages if not already linked
$updated = $html
foreach ($kvp in $nameToSlug.GetEnumerator()) {
  $svc = $kvp.Key
  $slug = $kvp.Value
  $escaped = [regex]::Escape($svc)
  # Replace only bare <h4>Service</h4> (not those already containing <a>)
  $patternH4 = "<h4>\s*$escaped\s*</h4>"
  $replacement = "<h4><a href=\"$slug.html\">$svc</a></h4>"
  $updated = [regex]::Replace($updated, $patternH4, $replacement)
}

if ($updated -ne $html) {
  Set-Content -Path $htmlPath -Encoding UTF8 -Value $updated
}

Write-Output "Created $created new service pages."


