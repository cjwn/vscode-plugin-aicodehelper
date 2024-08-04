import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('aicodehelper.compare', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const originalText = editor.document.getText();
			const newUri = vscode.Uri.parse('untitled:AI code');
            // 创建一个新的空白文档
            const newDoc = await vscode.workspace.openTextDocument(newUri);
            await vscode.window.showTextDocument(newDoc, vscode.ViewColumn.Active);

            // 等待用户粘贴代码
            const disposablePaste = vscode.workspace.onDidChangeTextDocument(async (e) => {
                if (e.document === newDoc) {

                    // 运行对比命令
                    vscode.commands.executeCommand('vscode.diff', newDoc.uri, editor.document.uri,);

                    disposablePaste.dispose();
                }
            });
        }
    });

    context.subscriptions.push(disposable);


}

export function deactivate() {}
