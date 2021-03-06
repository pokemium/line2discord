/** @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config} */
module.exports = {
    // プログラムの実行環境をESLintに教える
    // 各環境には、あらかじめ定義されたグローバル変数のセットが付属しています。
    env: {
        browser: true,
        es2020: true,
    },

    // 共有設定を適用する。共有設定はESLintに標準で含まれているものか別途インストールしたもの、またはインストール済みのプラグインのパッケージに含まれているものを指定する
    // 共有設定: 複数のルールの適用をまとめて設定するもの
    extends: [
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
        'prettier',
    ],

    // ESLintが使用するパーサを指定する
    parser: '@typescript-eslint/parser',

    // パーサ(今回は @typescript-eslint/parser)の各種実行オプションを設定する
    // parserOptions設定オプションは、ESLintにどのバージョンのJavaScriptを対象としているかを伝えます。例えば、以下のJavaScriptはparserOptions.ecmaVersionを2017に設定した場合に有効です。
    parserOptions: {
        ecmaVersion: 2020,  // パース対象のJSのバージョン
        sourceType: 'module',   // ESMで書くなら必須

        // tsconfig.jsonとは別ファイルを作って、チェックするファイルを限定する
        // こうしないとパーサが npm パッケージのファイルまでパースしてしまって、VSCodeと連携させたときのパフォーマンスがガタ落ちしたり、新規ファイルのパースに失敗したりしてしまう模様
        // 参考: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/parser/README.md#parseroptionsproject
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
    },

    // 任意のプラグインを読み込む
    // プラグイン: ESLintの組み込みルール以外に独自のルールを追加するもの
    // プラグインは読み込んだだけではなんの効力も持たず、extendsかrulesで設定する必要がある
    plugins: [
        '@typescript-eslint',
        'import',
        'unused-imports',
        'prefer-arrow',
        'prettier',
    ],

    // ESLint はデフォルトの挙動として親ディレクトリの設定ファイルまで読み込んでしまうので、それを抑止するためのもの
    root: true,

    // 適用する個別のルールと、エラーレベルや例外などその設定値を記述する
    // 基本的にはextendsで適用した共有設定が読み込まれているので、そのうちのいくつかを個別で無効にしたいときに設定する
    rules: {
        // クラスメンバーの定義の間に空行を入れるかどうかを定義するルール。
        // eslint-config-airbnb で常に空行を入れるように設定されていたのを、ここでは1行記述のメンバーのときは空行を入れなくていいようにしている
        'lines-between-class-members': [
            'error',
            'always',
            {
                exceptAfterSingleLine: true,
            },
        ],
        'no-void': 'off', // Onにするとvoid使用禁止
        // 任意の構文の間に区切りの空行を入れるかどうかを定義するルール。
        // ここでは return 文の前に常に空行を入れるよう設定している
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: '*',
                next: 'return',
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                'vars': 'all',
                'args': 'after-used',
                'argsIgnorePattern': '_',
                'ignoreRestSiblings': false,
                'varsIgnorePattern': '_',
            },
        ],
        // インポートの際のファイル拡張子を記述するかを定義するルール。
        // npmパッケージ以外の ファイルについて .js、.jsx、.ts、.tsx のファイルのみ拡張子を省略し、他のファイルは拡張子を記述させるように設定
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                ts: 'never',
            },
        ],
        'prefer-arrow/prefer-arrow-functions': [
            'error',
            {
                disallowPrototype: true,
                singleReturnOnly: false,
                classPropertiesAllowed: false,
            },
        ],
        'unused-imports/no-unused-imports-ts': 'warn',
        'sort-imports': 'off',
        'import/order': [
            "error",
            {
                'alphabetize': {
                    'order': 'asc'
                }
            }
        ],
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
    },
    settings: {
        // import文のlint(tsconfig.jsonのbaseUrlとは別)
        'import/resolver': {
            // https://www.npmjs.com/package/eslint-import-resolver-node
            node: {
                // lint時のパス解決のルート
                // tsconfig.json の baseUrl と同じにしておけばOK
                paths: ['src'],
            },
        },
    },
};
