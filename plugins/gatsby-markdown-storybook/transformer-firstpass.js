const util = require(`./ast-util`)


function firstPassReplacer(node, scope){
    //note all nodes are lowercase
    switch (node.tagName) {
        case "choice":
        case "check":
            scope.lastBranch = node
            return node

        case "else":
            if (scope.lastBranch) {
                scope.lastBranch.otherwise = node.children
                return util.textNode()
            }

            return util.textNode("!!! Else statement with no clear associated node !!!")
        default:
            return node
    }

}

function visit(ast, scope={}){

    if (ast.children) ast.children.forEach((node, index) => {

        //Replace node if needed
        if (node.type === "element")
            ast.children[index] = firstPassReplacer(node, scope)

        //Go Deeper in the tree
        visit(node, {})

    })

    return ast

}


module.exports = visit
