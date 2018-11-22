import React, { Component } from 'react';
import config from 'config';

class ProfileGithub extends Component {

    state = {
        repos: [],
        count: 5,
        sort: "created: asc",
    }

    componentDidMount() {
        fetch(`https://api.github.com/users/${this.props.github}/repos?per_page=${this.state.count}&sort=${this.state.sort}&client_id=7b4ef527e059113e214f& client_secret=f4d0af7d38c649377aa7d154977e6aa502f3ca7d`)
            .then(res => res.json())
            .then(data => {
                if (this.refs.myRef) {
                    this.setState(() => ({
                        repos: data
                    }))
                }
            })
            .catch(err => console.log(err))
    }//end componentDidMount

    render() {
        return (
            <div ref="myRef">
                <hr />
                <h3 className="mb-4">Latest Github Repository</h3>
                {this.state.repos.map((repo) => {
                    return (
                        <div key={repo.id} className="card card-body mb-2">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>
                                        <a href={repo.html_url} className="text-info" target="_blank" rel="noopener noreferrer"> {repo.name}</a>
                                    </h4>
                                    <p>{repo.description}</p>
                                </div>
                                <div className="col-md-6">
                                    <span className="badge badge-info mr-1"> Stars: {repo.stargazers_count}</span>
                                    <span className="badge badge-secondary mr-1"> Watchers: {repo.watchers_count} </span>
                                    <span className="badge badge-success"> Forks: {repo.forks_count} </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}


export default ProfileGithub;
