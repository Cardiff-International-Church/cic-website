# CIC Website

[![HTML](https://img.shields.io/badge/HTML-96.5%25-orange)](https://github.com/Cardiff-International-Church/cic-website)
[![JavaScript](https://img.shields.io/badge/JavaScript-3.5%25-yellow)](https://github.com/Cardiff-International-Church/cic-website)

Welcome to the official repository for the Cardiff International Church (CIC) Website!

## Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
- [CI/CD](#cicd)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

This repository contains the source code for the [Cardiff International Church](https://cardiffinternationalchurch.org) website. The goal is to provide information about CIC, its vision, activities, and how to get involved.

## Features

- Responsive and accessible website design
- Information about CIC and its ministries
- Upcoming events and news
- Contact and location details
- Integration with social media and newsletter sign-up

## Getting Started

To run the site locally or contribute, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Cardiff-International-Church/cic-website.git
   cd cic-website
   ```

2. **Open the Website:**
   - You can open the `index.html` file directly in your browser to preview the site.
   - For advanced features or scripts, use a local server (e.g., [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code).

## CI/CD

This repository uses [GitHub Actions](https://github.com/features/actions) for basic Continuous Integration (CI).

A simple workflow is available at `.github/workflows/ci.yml`:

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: A simple success step
        run: echo "Build check passed!"
```

This workflow runs on every push and pull request, checking out the repository and confirming a successful build step.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git add -A; git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Create a Pull Request

Feel free to open issues for suggestions or bug reports.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

- Website: [cardiffinternationalchurch.org](https://cardiffinternationalchurch.org)
- Email: [cardiffinternationalchurch@gmail.com](mailto:cardiffinternationalchurch@gmail.com)

## Emailjs

More information to follow...

---

*The website for CIC — Cardiff International Church*
