package org.kalpataruboi.siilavanta.tipitaka;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.DataSetObserver;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;
import android.webkit.WebView;
import android.widget.Toast;

public class DatabaseHelper extends SQLiteOpenHelper {

    public final static String DATABASE__NAME = "tipitaka.db";
    public final static String TABLE_NAME = "pbd";
    public static final String COL_1 = "id";
    public static final String COL_2 = "chaptxt";
    public static final String COL_3 = "paranum";
    public static final String COL_4 = "chapnum";
    public static final String COL_5 = "titlenum";
    public static final String COL_6 = "subheadnum";


    private static final String TAG = DatabaseHelper.class.getName().toString();

    public DatabaseHelper(Context context) {
        super(context, DATABASE__NAME, null, 1);

    }



    @Override
    public void onCreate(SQLiteDatabase db) {
        // db.execSQL("CREATE TABLE IF NOT EXISTS "+TABLE_NAME+"(id INTEGER PRIMARY KEY AUTOINCREMENT,_word TEXT,_gram TEXT,_meaning TEXT)");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
//        db.execSQL("DROP TABLE IF EXISTS "+TABLE_NAME);
//        onCreate(db);
    }

    public boolean insertData(String _word, String _gram, String _meaning) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put(COL_2, _word);
        cv.put(COL_3, _gram);
        cv.put(COL_4, _meaning);
        long result = db.insert(TABLE_NAME, null, cv);
        if (result == -1) return false;
        else return true;
    }

    public Cursor getData(String id){
        SQLiteDatabase db = this.getWritableDatabase();
        String query="SELECT * FROM "+TABLE_NAME+" WHERE id='"+id+"'";
        Cursor  cursor = db.rawQuery(query,null);
        return cursor;
    }

    public boolean updateData(String id, String _word, String _gram, String _meaning) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put(COL_1, id);
        contentValues.put(COL_2, _word);
        contentValues.put(COL_3, _gram);
        contentValues.put(COL_4, _meaning);
        db.update(TABLE_NAME, contentValues, "id=?", new String[]{id});
        return true;
    }

    public Integer deleteData (String tableName, String id) {
        SQLiteDatabase db = this.getWritableDatabase();
        return db.delete(tableName, "id = ?", new String[]{id});
    }
    Cursor res;
    public Cursor getAllData(String tableName) {
        SQLiteDatabase db = this.getWritableDatabase();
         res = db.rawQuery("SELECT * FROM "+ tableName, null);
        if (res.isLast()){
            db.close();

        }
        return res;

    }

    public Cursor search(String tableName, String txt){
        SQLiteDatabase db = this.getWritableDatabase();
        String query="SELECT * FROM "+tableName+" WHERE chaptxt like '"+txt+"%'";
        Cursor res = db.rawQuery(query , null);
        return res;

    }
    public  Cursor fullSearch(String tableName, String txt){
        SQLiteDatabase db = this.getReadableDatabase();
        String query = "SELECT * FROM "+tableName+" WHERE chaptxt like '%"+txt+"%'";
        Cursor res = db.rawQuery(query , null);
       // db.close();

        return res;
    }

    public  String getZeorChapter(String tableName){
        SQLiteDatabase db = this.getReadableDatabase();
        String query = "SELECT * FROM " + tableName + " where chapnum in (" + 0 + ");";
        Cursor res = db.rawQuery(query , null);
        // db.close();
        String str = "";
        while (res.moveToNext()){
            if (!res.isFirst()){
                str += res.getString(1);
            }
        }

        return str;
    }
    public void bookTemplate(String tableName, WebView webView){

        SQLiteDatabase db = this.getReadableDatabase();
        String chapter = "chaptxt like '%class=\"chapter\"%'";
        String title = "chaptxt like '%class=\"title\"%'";
        String subhead = "chaptxt like '%class=\"subhead\"%'";
        String chaphead = "chaptxt like '%class=\"chaphead\"%'";

        String statement = "SELECT * FROM " + tableName + " where " + chapter + " or " + title + " or "+ subhead + " or "+ chaphead;
        Cursor cursor = db.rawQuery(statement, null);

        StringBuffer stringBuffer = new StringBuffer();
        while (cursor.moveToNext()){

           // String row = "{name : '"+cursor.getString(1) + "', chapId : '" + cursor.getString(3) + "', titleId : '"  +cursor.getString(4) + "', subheadId : '"  +cursor.getString(5) + "'},|";
           // String row = cursor.getString(1) + "|" + cursor.getString(3) +"||";
            boolean isFirst = cursor.isFirst();
            boolean isLast = cursor.isLast();
           // Log.d(TAG, "count : " );

            String eventTem = "{\n" +
                    "                    bookkey : " + tableName + ", \n" +
                    "                    id: " + cursor.getString(0) + ",\n" +
                    "                    chaptxt: `" + cursor.getString(1) + "`,\n" +
                    "                    paranum: '" + cursor.getString(2) + "', \n" +
                    "                    chapnum: '" + cursor.getString(3) + "', \n" +
                    "                    titlenum: '" + cursor.getString(4) + "', \n" +
                    "                    subheadnum: '" + cursor.getString(5) + "', \n" +
                    "                    isFirst : " + isFirst + ", \n" +
                    "                    isLast : " + isLast + " \n" +
                    "\n" +
                    "                }\n";
           // Log.d(TAG, "bookTemplate: " + tableName);
            webView.evaluateJavascript("setBookTemplate('" + tableName + "'," +eventTem + ")", null );


           // stringBuffer.append(row);
            if (cursor.isLast()){
                db.close();
            }
            //Log.d(TAG, "bookTemplate: " + cursor.getString(1) + " | chapnum : " + cursor.getString(3) + " | titlenum "  +cursor.getString(4) + "  | subhead "  +cursor.getString(5));
        }
       // Log.d(TAG, "bookTemplate: " + stringBuffer);
        //webView.evaluateJavascript("setBookTemplate(`" + tableName + "`, `" + stringBuffer + "`)", null );

    }

    public String getJsTemplate(Cursor cursor, String tableName){
        boolean isFirst = cursor.isFirst();
        boolean isLast = cursor.isLast();
        String eventTem = "{\n" +
                "                    bookkey : " + tableName + ", \n" +
                "                    id: " + cursor.getString(0) + ",\n" +
                "                    chaptxt: `" + cursor.getString(1) + "`,\n" +
                "                    paranum: '" + cursor.getString(2) + "', \n" +
                "                    chapnum: '" + cursor.getString(3) + "', \n" +
                "                    titlenum: '" + cursor.getString(4) + "', \n" +
                "                    subheadnum: '" + cursor.getString(5) + "', \n" +
                "                    isFirst : " + isFirst + ", \n" +
                "                    isLast : " + isLast + " \n" +
                "\n" +
                "                }\n";
       // Log.d(TAG, "getJsTemplate: " + tableName + "pppp");

        return eventTem;
    }

    public void getChapter(String tableName, String  chapterKey, String topKey, WebView webView){
        SQLiteDatabase db = this.getReadableDatabase();
        String statement = "SELECT * FROM " + tableName + " where chapnum in (\""+ chapterKey + "\") ";
        Cursor cursor = db.rawQuery(statement, null);
        //StringBuffer stringBuffer = new StringBuffer();
        while (cursor.moveToNext()){
            String data;
            data = "[`" + cursor.getString(0) + "`,`" + cursor.getString(1) + "`,`" + cursor.getString(2) + "`,`" +
                    cursor.getString(3) + "`,`" +cursor.getString(4) + "`,`" +cursor.getString(5) +"`," +
                    cursor.isFirst() + "," + cursor.isLast() + "]";
            webView.post(new Runnable() {
                @Override
                public void run() {
                    webView.evaluateJavascript("setChapter(" + data + ", '" + topKey+ "')", null);
                }
            });
            if (cursor.isLast()){
                db.close();
            }
        }

    }

    public void getChapterforSearch(String tableName, String  chapterKey, String itemIndexSub, String  index, WebView webView, Context context){
        SQLiteDatabase db = this.getReadableDatabase();
        String statement = "SELECT * FROM " + tableName + " where chapnum in ("+ chapterKey + ")";

        Cursor cursor = db.rawQuery(statement, null);

        if (cursor.getCount() != 0){
            while (cursor.moveToNext()){
                String data;
                data = "[`" + cursor.getString(0) + "`,`" + cursor.getString(1) + "`,`" + cursor.getString(2) + "`,`" +
                        cursor.getString(3) + "`,`" +cursor.getString(4) + "`,`" +cursor.getString(5) +"`," +
                        cursor.isFirst() + "," + cursor.isLast() + "]";
                //webView.evaluateJavascript("setChapter(" + data + ", '" + itemIndexSub+ "', '" + query + "')", null);
                webView.post(new Runnable() {
                    @Override
                    public void run() {
                        webView.evaluateJavascript("setChapter(" + data + ", '" + itemIndexSub+ "', '" + index + "')", null);
                    }
                });
                if (cursor.isLast()){
                     db.close();
                }
            }
        }else {
            Toast.makeText(context, chapterKey + "Not fount chapter", Toast.LENGTH_SHORT).show();
        }


    }
}

