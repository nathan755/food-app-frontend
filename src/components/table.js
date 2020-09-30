import React, { Component } from "react";
import Button from "./button";

// const exampleConfiguration = {
//     title:"Users",
//     header:[
//         "First Name",
//         "Last Name",
//         "email",
//         "role",
//         "action"
//     ],
//     rows:[
//         {
//          values:[
//              "nathan",
//              "denholm",
//              "nathan@mail.com",
//              "employee"
//          ],
//          data:{

//          },
//          buttons:[
//             {
//                 value:"DELETE",
//                 onclick:()=>{},
//                 loading:false,
//                 disabled:false
//             },
//             {
//                 value:"UPDATE",
//                 onclick:()=>{},
//                 loading:false,
//                 disabled:false
//             }
//          ]     
//         }
//     ]
// }
class Table extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
		  <div className="table">
			<table>
			  <tr>
				{this.props.config.header.map((item) => {
				  return <th>{item}</th>;
				})}
			  </tr>
			  {this.props.config.rows.map((row) => {
				return (
				  <tr>
					{row.values.map((value) => {
					  return (
						<td>
						  {value === "button"
							? row.buttons.map((button) => {
								return (
								  <Button
									value={button.value}
									onClick={button.onClick}
									loading={button.loading}
									disabled={button.disabled}
									style={button.style}
								  />
								);
							  })
							: value}
						</td>
					  );
					})}
				  </tr>
				);
			  })}
			</table>
		  </div>
		);
	}
}

export default Table;