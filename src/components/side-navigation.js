import React, { Component } from "react";
import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import Button from "./button";

class SideNav extends Component {
    constructor(props) {
        super(props)

        this.onLogoutClick = this.onLogoutClick.bind(this);


    }

    onLogoutClick() {

    }

    render() {
        return (
            <div className="side-nav">
                <i class="far fa-user"></i>
                <h2>Company Name</h2>
                <ul>
                    {this.props.config.map((navItem) => {
                        return (
                            <div className="side-nav__link">
                                <li>
                                    <Link to={navItem.route}>{navItem.copy}</Link>
                                </li>
                            </div>
                        )
                    })}
                </ul>
                <Button value="Logout" />
            </div>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        company: state.account.companyName
    }
}

export default connect(mapStateToProps)(SideNav);