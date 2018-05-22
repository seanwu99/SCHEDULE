var ListBox = React.createClass({
    render: function () {
        return (
            <button type="button" className="list-group-item" id="product-list">
                <div className="row vertical-align">
                    <div className="col-sm-8 top">
                        <h4>Top Label</h4>
                        <p>10 boxes at 20 bags</p>
                    </div>
                    <div className="col-sm-3 text-right top">
                        <h4>
                            99.99
                            <small className="text-muted"> EUR</small>
                        </h4>
                        <p>Available</p>
                    </div>
                    <div className="col-sm-1 center">
                        <span className="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span>
                    </div>
                </div>
            </button>
        );
    }
});


var ListBox2 = React.createClass({
    render: function () {
        return (
            <div class="container">
                <h2>Button Group</h2>
                <p>The .btn-group class creates a button group:</p>
                <div class="btn-group">
                    <button type="button" class="btn btn-primary">Apple</button>
                    <button type="button" class="btn btn-primary">Samsung</button>
                    <button type="button" class="btn btn-primary">Sony</button>
                </div>
            </div>

        );
    }
});
var ProductList = React.createClass({
    render: function () {
        return (
            <div className="list-group">
                <ListBox/>
                <ListBox2/>
                <ListBox2/>
                <ListBox2/>
                <ListBox/>
            </div>
        )
    }
});

ReactDOM.render(
    <ProductList/>,
    document.getElementById('product-list')
);
