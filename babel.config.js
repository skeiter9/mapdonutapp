module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ],
        ["@babel/plugin-proposal-class-properties"],
        [
           "module-resolver",
           {
                "root": ["./src", "./__tests__"],
                "extensions": [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
                "alias": {
                    
                }
           }
        ]
    ]
  };