import React, { useEffect, useState , Component} from 'react'
import EditorJs from '@natterstefan/react-editor-js'
import { EDITOR_JS_TOOLS } from '../../constants/editor.constants'

class Editor extends Component {
  constructor(props) {
    super(props);
    this.cleanData = "";
  }

  async onSave() {
    const outputData = await this.editorInstance.save();
    this.cleanData = JSON.stringify(outputData);
    this.props.onChange(outputData)
    console.log(outputData);
  }
  render() {

    return (
        <EditorJs
          editorInstance={(instance) => (this.editorInstance = instance)}
          tools={EDITOR_JS_TOOLS}
          data={this.props.value || {blocks: []}}
          onChange={this.onSave.bind(this)}
          // logLevel="ERROR"
        />

    );
  }
}

export default Editor
