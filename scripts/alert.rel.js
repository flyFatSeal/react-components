const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// @ts-check
const { join } = require("path");
const base = (path) => join(__dirname, "../", path);

/**
 * @type {import("webpack").Configuration}
 */
module.exports = {
    mode: "production",
    entry: {
        alert2: "./src/haiwell/Alert/index.tsx",
    },
    output: {
        library: '[name]',
        libraryTarget: "var",
        filename: '[name].rel.js',
        path: base("./dist"),
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
    },

    optimization: {
        minimize: true
    },

    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8889,
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            logLevel: 'info',
        }),
    ],


    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                    configFile: base("./tsconfig.json"),
                },
            },
            {
                test: /\.less?$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

