// todo if google rangy exists should extend that
var rangy = {
    _bookmarkId: 0,
    getSelection(){
        return window.getSelection();
    },
    createRange (){
        return document.createRange();
    },
    createBookmark(range, serializable){
        var startNode, endNode;
        var baseId;
        var clone;
        var collapsed = range.collapsed;
        var prefix = '__bookmark__';

        startNode = document.createElement('span');
        startNode.style.display = 'none';

        if (serializable) {
            baseId = prefix + (this._bookmarkId++);

            startNode.setAttribute('id', baseId + ( collapsed ? 'C' : 'S' ));
        }

        if (!collapsed) {
            endNode = startNode.cloneNode(true);

            if (serializable) {
                endNode.setAttribute('id', baseId + 'E');
            }
            // insert end node
            clone = range.cloneRange();
            clone.collapse(false);
            clone.insertNode(endNode);
        }

        // insert start node
        clone = range.cloneRange();
        clone.collapse(true);
        clone.insertNode(startNode);

        // reset range position
        if (endNode) {
            range.setEndBefore(endNode);
        }
        range.setStartAfter(startNode);

        return {
            startNode: serializable ? baseId + ( collapsed ? 'C' : 'S' ) : startNode,
            endNode: serializable ? baseId + 'E' : endNode,
            serializable: serializable,
            collapsed: collapsed
        }
    },

    moveToBookmark(bookmark, range){
        var serializable = bookmark.serializable,
            startNode = serializable ? document.getElementById(bookmark.startNode) : bookmark.startNode,
            endNode = serializable ? document.getElementById(bookmark.endNode) : bookmark.endNode;

        range.setStartAfter(startNode);
        startNode.remove();

        if (endNode) {
            range.setEndBefore(endNode);
            endNode.remove();
        } else {
            range.collapse(true);
        }
        return range
    }
};


module.exports = rangy;
