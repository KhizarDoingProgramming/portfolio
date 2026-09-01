import os
import re

html_files = ['index.html', 'projects.html']

favicon_tags = """    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
"""

for file_path in html_files:
    if not os.path.exists(file_path):
        continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace relative assets paths
    content = content.replace('"assets/', '"/assets/')
    content = content.replace("'assets/", "'/assets/")
    content = content.replace("url('assets/", "url('/assets/")
    content = content.replace('url("assets/', 'url("/assets/')
    content = content.replace('url(assets/', 'url(/assets/')
    
    # Check if favicon tags already injected to avoid duplication
    if 'apple-touch-icon.png' not in content:
        # Insert favicon tags before closing head
        content = content.replace('</head>', f'{favicon_tags}</head>')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("HTML files updated successfully.")
