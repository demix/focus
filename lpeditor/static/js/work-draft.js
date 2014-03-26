/**
 * work-draft.js
 *
 * changelog
 * 2014-03-19[21:29:44]:created
 *
 * This js should work with 'Worker'
 *
 * @info yinyong,osx-x64,UTF-8,10.129.175.199,js,/Volumes/yinyong/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
(function(global) {

    var MAX_ITEMS_COUNT = 20;

    function ctrlDB(success) {
        var _indexdbDB = (global.indexedDB || global.webkitIndexedDB || global.mozIndexedDB || global.msIndexedDB);

        var openRequest = _indexdbDB.open("lpdraft", 3);

        openRequest.onupgradeneeded = function(evt) {
            var db = evt.target.result;
            //delete if it exists
            try{db.deleteObjectStore('draft');}catch(e){}
            var store = db.createObjectStore("draft", {
                keyPath: 'timestamp'
            });
        };

        openRequest.onsuccess = success;
        openRequest.onerror = function(evt) {
            console.log(evt.target.error)
        };
    }

    function get(timestamp) {
        ctrlDB(function(evt) {
            var db = evt.target.result;
            var trans = db.transaction('draft');
            var store = trans.objectStore('draft');
            var req = store.openCursor(IDBKeyRange.only(timestamp));
            req.onsuccess = function() {
                var cursor = req.result;
                if (cursor) {
                    postMessage({
                        cmd: 'loadDraft',
                        payload: cursor.value
                    });
                }
            };
            req.onerror = function(evt) {
                console.error(evt.target.error);
            }
        });
    }

    function save(draft) {
        ctrlDB(function(evt) {
            var db = evt.target.result;
            var trans = db.transaction('draft', 'readwrite');
            var store = trans.objectStore('draft');
            store.put(draft);
            list();
        });
    }

    function list() {
        ctrlDB(function(evt) {
            var db = evt.target.result;
            var trans = db.transaction('draft', 'readwrite');
            var store = trans.objectStore('draft');
            var req = store.openCursor(null, 'prev');
            var timestamps = [];
            var index = 0;
            req.onsuccess = function() {
                var cursor = req.result;
                if (cursor) {
                    if (index++ < MAX_ITEMS_COUNT) {
                        timestamps.push(cursor.value.timestamp);
                    } else {
                        cursor.delete();
                    }
                    cursor.
                    continue ();
                } else {
                    postMessage({
                        cmd: 'showDraftList',
                        payload: timestamps
                    });
                }
            };
        });
    }

    onmessage = function(event) {
        switch (event.data.cmd) {
            case 'getDraftList':
                list();
                break;
            case 'saveDraft':
                save(event.data.payload);
                break;
            case 'getDraft':
                get(event.data.payload.timestamp);
                break;
            default:
                ;
        }
    };

})(this);