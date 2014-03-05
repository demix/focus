/**
  * TestCase.js
  *
  * changelog
  * 2014-03-04[19:25:26]:created
  *
  * @info yinyong,osx-x64,UTF-8,10.129.172.32,js,/Volumes/yinyong/lpeditor/js
  * @author yanni4night@gmail.com
  * @version 0.0.1
  * @since 0.0.1
  */
define(['Element'],function(Element){

    function TestCase(callbackfn){
        if(this===window){
            return new TestCase(callbackfn);
        }

        try{
            callbackfn();
        }catch(e){
            console.error(e.message);
        }
    }


    function run(){

        new TestCase(function(){
            new Element('div','case',{id:'xxx',name:'x'},{'color':'red'}).html(true);
        });

    }

    return {
        run:run
    };
});