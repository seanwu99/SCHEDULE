var ListBox = React.createClass({
    var testData =
        {
            ProductID:0,
            ProductName: "Test Product 1",
            QuantityPerUnit: "100 units per box",
            UnitPrice: "49.75",
            Discontinued: false
        };

render: function() {
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

var ProductList = React.createClass({
    render: function() {
        return (
            <div className="list-group">
            <ListBox />
            <ListBox />
            <ListBox />
            </div>
    )
    }
});

ReactDOM.render(
<ProductList />,
    document.getElementById('product-list')
);
