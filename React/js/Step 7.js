// Step 7: Extend the current application in two areas:
// First, add a header to the list of products. The header will eventually contain dynamic items for the entire list.
// Second, add a modal dialog box with product details. When the user clicks on a row, the application will show this detail.




var ModalProductDetail = React.createClass({
    render: function() {
        return (
            <div className="modal fade" tabIndex="-1" role="dialog" id="product-detail">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Title</h4>
                        </div>
                        <div className="modal-body">
                            <p>Product Name: {this.props.row.ProductName}</p>
                            <p>Unit Price: {this.props.row.UnitPrice}</p>
                            <p>Status: {this.props.row.Discontinued}</p>
                            <p>Category: {this.props.row.CategoryID} </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

var TitleBar = React.createClass({
    render: function() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <div className="navbar-brand">Product Overview</div>
                    </div>

                    <div className="nav navbar-nav navbar-right">
                        <p className="navbar-text">Items: {this.props.count}</p>
                    </div>
                </div>
            </nav>
        )
    }
});

var ListBox = React.createClass({
    render: function() {
        return (
            <button type="button" className="list-group-item" id="product-list"
                    onClick={this.props.clickEvent} >
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
        return {
            products: [],
            selectedRow: null,
        };
    },

    onListBoxClick: function( row ) {
        this.setState({selectedRow: row});

        setTimeout( function() {
            $('#product-detail').modal("show");
        });
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
                <ListBox row={row} key={row.ProductName}
                         clickEvent={this.onListBoxClick.bind(this, row)}/>
            );
        }.bind(this) )

        return (
            <div>
                <TitleBar count={this.state.products.length}/>
                <div className="list-group">
                    {productListBoxes}
                </div>
                {this.state.selectedRow == null ? null :
                    <ModalProductDetail row={this.state.selectedRow} /> }
            </div>
        )
    }
});

ReactDOM.render(
    <ProductList />,
    document.getElementById('product-list')
);
