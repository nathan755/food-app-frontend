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
//				"button" -----> if button a button will be rendered using button oject below
//          ],
//          data:{

//          },
//          buttons:[
//             {
//                 value:"DELETE",
//                 onclick:()=>{},
//                 loading:false,
//                 disabled:false,
//					style:"danger"
//             },
//             {
//                 value:"UPDATE",
//                 onclick:()=>{},
//                 loading:false,
//                 disabled:false,
//					style:"warning"
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
			  <tr className="table__header">
				{this.props.config.header.map((item) => {
				  return <th>{item}</th>;
				})}
			  </tr>
			  {this.props.config.rows.map((row) => {
				return (
				  <tr className="table__row">
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