module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                    root: ["."],
                    alias: {
                        "react-native-device-info": "./react-native-device-info.js",
                        "@/components": "./src/components",
                        "@/navigation": "./src/navigation",
                        "@/screen": "./src/screens",
                        "@/images": "./src/images",
                        "@/store": "./src/store",
                        "@/service": "./src/service",
                        "@/utils": "./src/utils",
                        "@/interfaces": "./src/interfaces",
                        "@/hooks": "./src/hooks",
                        "@/const": "./const"
                    }
                }
            ]
        ],
        env: {
            production: {
                plugins: ["react-native-paper/babel", "react-native-reanimated/plugin"]
            }
        }
    };
};
