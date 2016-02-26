import React from 'react'

const Wrapper = React.createClass({
    getInitialState(){
        return {
            year: new Date().getFullYear()
        }
    },
    render(){
        return (
            <section>
                <nav className="navbar navbar-default">
                    <div className="container">
                        <a href="#" className="navbar-brand">NEXT TRAIN: BART</a>
                    </div>
                </nav>
                <main className="container">
                    <section className="row">
                        <div className="col-md-6 col-md-offset-3">
                            {this.props.children}
                        </div>
                    </section>
                </main>
                <footer className="footer">
                    <div className="container">
                        <p className="text-mute text-center">
                            nexttrain - {this.state.year}
                        </p>
                    </div>
                </footer>
                <footer>

                </footer>
            </section>
        )
    }
})

export default Wrapper
