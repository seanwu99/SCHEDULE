var testData = [
    {
        ProductID: 0,
        ProductName: "Test Product 1",
        QuantityPerUnit: "100 units per box",
        UnitPrice: "49.75",
        Discontinued: false
    },
    {
        ProductID: 1,
        ProductName: "Test Product 2",
        QuantityPerUnit: "20 cases per pallet",
        UnitPrice: "168.77",
        Discontinued: false
    },
    {
        ProductID: 2,
        ProductName: "Test Product 3",
        QuantityPerUnit: "20 per box, 20 boxes",
        UnitPrice: "4953.75",
        Discontinued: false
    },
    {
        ProductID: 3,
        ProductName: "Test Product 4",
        QuantityPerUnit: "65 individually wrapped",
        UnitPrice: "112.50",
        Discontinued: true
    }
];

var ListBox = React.createClass({
    render: function () {
        return (
            <button type="button" className="list-group-item" id="product-list">
                <div className="row vertical-align">
                    <div className="col-sm-8 top">
                        <h4>{this.props.row.ProductName}</h4>
                        <p> {this.props.row.QuantityPerUnit}</p>
                    </div>
                    <div className="col-sm-3 text-right top">
                        <h4>
                            {this.props.row.UnitPrice}
                            <small className="text-muted"> EUR</small>
                        </h4>
                        <p>{this.props.row.Discontinued ? "Discontinued" : "Available"}</p>
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
    render: function () {
        var productListBoxes = testData.map(function (row) {
            return (
                <ListBox row={row} key={row.ProductName}/>
            );
        })

        console.log(productListBoxes);

        return (
            <div className="list-group">
                {productListBoxes}
            </div>
        )
    }
});

ReactDOM.render(
    <ProductList/>,
    document.getElementById('product-list')
);
