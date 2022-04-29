

let attr_arr = dataset_info["Attributes"]["attr"]

class AttributeTable extends React.Component {
    render() {
        return (
            <table className="pure-table pure-table-horizontal" id="attribute_info">
                <thead>
                    <tr>
                        <th>Atriibute</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        attr_arr.map((item, index) => {
                            return <tr key={index}>
                                <td>{item["a_name"]}</td>
                                <td>{item["description"]}</td>
                            </tr>
                        })
                    }
                </tbody>

            </table>

        );
    }
}


ReactDOM.render(
    <AttributeTable />,
    document.getElementById('attribute_container')
);