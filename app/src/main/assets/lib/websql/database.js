
function onError(tx, error) {
    //alert(error.message);
    console.log(error.message)
}

function DatabaseHelper() {

    this.initDatabase = function (dbName, version, description, size, callback) {

        var db = openDatabase(dbName, version, description, size, cb)
        var cb = callback(db)
        return db
    }


        /**
    * first argument as a string @tableName is requre and
    * @callback return column name and id given users
        {
            col1 : ['firstName', 'text],
            col2 : ['lastName', 'text],
        }
    */
    this.statement = function (tableName, callback) {
        var column = callback()
        function getColumn() {

            var createColumnTexts = [];
            var insertColumnNames = [];
            var insertColumnValues = [];
            var updateColumnName = []
            if (typeof column == 'object') {
                for (const key in column) {
                    var columnName = column[key][0]
                    var columnType = column[key][1].toUpperCase()
                    var piar = columnName + " " + columnType
                    createColumnTexts.push(piar)
                    insertColumnNames.push(columnName)
                    insertColumnValues.push('?')
                    updateColumnName.push(columnName + ' = ?')
                }
                return {
                    'createColumnTexts': createColumnTexts.join(', '),
                    'insertColumnNames': insertColumnNames.join(', '),
                    'insertColumnValues': insertColumnValues.join(', '),
                    'updateColumnName': updateColumnName.join(', ')
                }
            } else {
                console.log('Please insert an objebt keys value of [col, type]')
                return {

                }
            }
        }

        var createStatement = `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, ${getColumn().createColumnTexts})`;
        //actualy string is language TEXT, gram TEXT, meaning TEXT
        var selectAllStatement = `SELECT * FROM ` + tableName;
        var insertStatement = `INSERT INTO ${tableName} (${getColumn().insertColumnNames}) VALUES (${getColumn().insertColumnValues})`;
        //actualy string is (language, gram, meaning) VALUES (?, ?, ?)
        var updateStatement = `UPDATE ${tableName} SET ${getColumn().updateColumnName} WHERE id = ?`;
        //actualy string is SET language = ?, gram = ?, meaning = ? WHERE id = ?
        var deleteStatement = "DELETE FROM " + tableName + " WHERE id=?";
        var dropStatement = "DROP TABLE " + tableName + "";
        // var uid = `SELECT * FROM ${tableName} where id=${id}`;

        return {
            "createStatement": createStatement,
            "insertStatement": insertStatement,
            "selectAllStatement": selectAllStatement,
            "updateStatement": updateStatement,
            "deleteStatement": deleteStatement,
            "dropStatement": dropStatement,
            "uniqueId": function (id) {
                return `SELECT * FROM ${tableName} where id=${id}`;
            }
        }
    }
}

