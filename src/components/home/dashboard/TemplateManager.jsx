import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import Backend from './../../../backend';

class TemplateManager extends React.Component {
  state = {
    allow: true,
    page: 0,
    templates: [], // {id, title, postType}
  }

  componentWillMount() {
    Backend.app.authenticate().then(res => {
      if (res.data.role === 'admin') {
        this.loadTemplates();
      } else {
        this.setState({ allow: false });
      }
    }).catch(err => {
      this.setState({ allow: false });
    })
  }

  loadTemplates = () => {
    Backend.app.service('templates').find({
      $select: ['id', 'title', 'postType']
    }).then(res => {
      this.setState({ templates: res.data });
    }).catch(err => {
      this.setState({ templates: [] });
    })
  }

  remove = (id) => {
    Backend.app.service('templates').remove(id)
      .then(res => {
        this.loadTemplates();
      }).catch(err => {
        this.setState({ allow: false });
      })
  }

  renderRow = (t) => {
    return (
      <Table.Row key={t._id}>
        <Table.Cell>{t.title}</Table.Cell>
        <Table.Cell>{t.postType}</Table.Cell>
        <Table.Cell><Icon link name='remove' onClick={(e) => { e.preventDefault(); this.remove(t._id) }} size="large" color="red" /></Table.Cell>
      </Table.Row>
    );
  }

  renderTable = () => {
    return (
      <div>
        <h4>Template Manager</h4><p>You can see post templates below, use actions to manage them.</p>
        <Table color="blue" unstackable striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.templates.map(t => this.renderRow(t))}
          </Table.Body>
        </Table>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.allow ? this.renderTable() : <Redirect to="/post" />}
      </div>
    );
  }
}

export default TemplateManager;
