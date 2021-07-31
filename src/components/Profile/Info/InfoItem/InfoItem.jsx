import React from 'react';
import styles from './InfoItem.module.css';

class InfoItem extends React.Component {
  state = {
    editMode: false,
    content: this.props.content,
    inputValue: this.props.content,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this.setState({ content: this.props.content });
    }
  }

  edit() {
    if (this.props.editable) {
      this.setState({ editMode: true, inputValue: this.props.content });
    }
  }

  inputChangeHandler(e) {
    const value = e.target.value;
    this.setState({ inputValue: value });
  }

  save() {
    this.setState((state) => ({ editMode: false, content: state.inputValue }));

    this.props.updateInfoItem(this.state.inputValue);
  }

  close() {
    this.setState((state) => ({ editMode: false, inputValue: state.content }));
  }

  render() {
    return (
      <div className={styles.item}>
        <span
          className={styles.name}
          style={this.props.editable ? { cursor: 'pointer' } : {}}
          onClick={() => this.edit()}
        >
          {this.props.name}:{' '}
        </span>

        <span className={styles.content}>{this.props.content}</span>

        {this.props.editable && this.state.editMode && (
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
