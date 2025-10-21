@echo off
cls
echo ========================================
echo Cardiff International Church Website
echo Firebase Deployment Script
echo ========================================
echo.

echo ========================================
echo Checking Firebase account...
echo ========================================
echo.

call firebase login:list

echo.
echo ========================================
echo Expected account: webdevelopmentchurch@gmail.com
echo ========================================
echo.

set /p "CONTINUE=Is the correct account logged in? (Y/N): "

if /i not "%CONTINUE%"=="Y" (
    echo.
    echo Please log in with the correct account:
    echo.
    firebase login
    echo.
    echo After logging in, please run this script again.
    pause
    exit /b 0
)

echo.
echo ========================================
echo Proceeding with deployment...
echo ========================================
echo.

echo Current Firebase project:
call firebase use
echo.

echo ========================================
echo Starting deployment...
echo ========================================
echo.

call firebase deploy --only hosting

if errorlevel 1 (
    echo.
    echo ========================================
    echo ERROR: Deployment failed!
    echo ========================================
    pause
    exit /b 1
)

echo.
echo ========================================
echo Deployment successful! 🎉
echo ========================================
echo.
echo Your website is now live!
echo.
echo Hosting URL: https://cic-website-245dd.web.app
echo Custom Domain: https://cardiffinternationalchurch.org
echo.
echo Firebase Console:
echo https://console.firebase.google.com/project/cic-website-245dd
echo.
echo ========================================
echo.
echo Press any key to close this window...
pause >nul
