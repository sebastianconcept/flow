osascript 2>/dev/null <<EOF
    tell application "System Events"
        tell process "Terminal" to keystroke "t" using command down
    end
    tell application "Terminal"
        activate
        do script with command "mongod --config /usr/local/etc/mongod.conf" in window 0
    end
    tell application "System Events"
        tell process "Terminal" to keystroke "t" using command down
    end
    tell application "Terminal"
        activate
        do script with command "cd \"$PWD/frontend\"; $*" in window 0
        do script with command "amber serve --port 3000" in window 0
    end
    tell application "System Events"
        tell process "Terminal" to keystroke "t" using command down
    end
    tell application "Terminal"
        activate
        do script with command "cd \"$PWD/backend\"; $*" in window 0
        do script with command "./pharo-ui Pharo.image" in window 0
    end
EOF
