import React from 'react';
import styles from './InfoItem.module.css';

class InfoItem extends React.Component {
  state = {
    editMode: false,
    link: this.props.link,
    content: this.props.content,
    inputValue: this.props.link ?? this.props.content,
  };

  edit() {
    this.setState((state) => ({ ...state, editMode: true }));
  }

  inputChangeHandler(e) {
    const value = e.target.value;
    this.setState({ ...this.state, inputValue: value });
  }

  save() {
    if (this.props.content) {
      this.setState((state) => ({
        state,
        editMode: false,
        content: state.inputValue,
      }));
    } else if (this.props.link) {
      this.setState((state) => ({
        state,
        editMode: false,
        link: state.inputValue,
      }));
    }
  }

  close() {
    this.setState((state) => ({
      ...state,
      editMode: false,
    }));
  }

  render() {
    return (
      <div className={styles.item}>
        <span className={styles.name} onClick={() => this.edit()}>
          {this.props.name}:{' '}
        </span>

        {this.props.link && (
          <a className={styles.link} href={this.state.link}>
            {this.state.link}
          </a>
        )}

        {this.props.content && (
          <span className={styles.content}>{this.state.content}</span>
        )}

        {this.state.editMode && (
          <div className={styles.editor}>
            <input
              autoFocus={true}
              className={styles.input}
              value={this.state.inputValue}
              onChange={(e) => this.inputChangeHandler(e)}
            />
            <button className={styles.saveButton} onClick={() => this.save()}>
              Save
            </button>
            <div className={styles.closeButton} onClick={() => this.close()}>
              ✖
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default InfoItem;
