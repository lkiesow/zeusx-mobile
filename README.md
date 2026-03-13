# UOSZEUSX ⋄ mobile

🦊 **[Install Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/uoszeusx-on-mobile/)**

A Firefox extension that provides a mobile-friendly interface for the ZeusX system at Osnabrück University.

## Description

This Firefox extension enhances the usability of the ZeusX system on mobile devices by providing a simplified, mobile-optimized interface that displays:
- Current attendance status (present/absent/unknown)
- Netto work time for the day
- Punch button for clocking in/out

## Features

- Mobile-optimized responsive design
- Automatic detection of attendance status
- One-click punch button for clocking in/out
- Displays today's netto work time

## Manual Installation

1. Clone or download this repository
2. In Firefox, go to `about:debugging`
3. Go to `This Firefox`
4. Use `Load Temporary Add-on` and point it to the `manifest.json`

## How It Works

The extension injects a mobile-optimized interface into the ZeusX website. It:

1. Detects the current attendance status (present, absent, or unknown)
2. Displays the netto work time for the current day
3. Provides a large punch button for clocking in/out
4. Automatically handles login redirects if needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Lars Kiesow
