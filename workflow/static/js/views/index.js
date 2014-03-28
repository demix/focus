define(['react'],function(React){

    var View = React.createClass({

        render: function(){
            return (
                <ul className="choose">
                    <li><a href="quick">Create a Quick flow</a></li>
                    <li><a href="full">Create a Full flow</a></li>
                </ul>
            );
        }
    });

    return View;

});
