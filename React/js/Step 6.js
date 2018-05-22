var ListBox = React.createClass({
    render: function() {
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
    getInitialState: function() {
        return {products: []};
    },

    componentDidMount: function() {
        var odataUrl = "/Northwind/V3/Northwind/Northwind.svc/";

        $.ajax({
            url: odataUrl + "Products" ,
            dataType: 'json',
            cache: false
        })
            .done( function( data, textStatus, jqXHR ) {
                    this.setState( {products: data.value } )
                }.bind(this)
            )
            .fail( function( jqXHR, textStatus, errorThrown ) {
                console.log("Error", jqXHR, textStatus, errorThrown );
                alert( "An arror occurred while retrieving data from the server: " + textStatus );
            });
    },

    render: function() {
        var productListBoxes = this.state.products.map( function(row) {
            return(
                <ListBox row={row} key={row.ProductName} />
            );
        })

        return (
            <div className="list-group">
                {productListBoxes}
            </div>
        )
    }
});

ReactDOM.render(
    <ProductList />,
    document.getElementById('product-list')
);
