import React, { Component } from "react";
import CustomFieldDateUi from "./date/CustomFieldDateUi";
import CustomFieldParaUi from "./paragraph/CustomFieldParaUi";
import CustomFieldTextUi from "./text/CustomFieldTextUi";
import CustomFieldIntUi from "./int/CustomFieldIntUi";
import CustomFieldDecUi from "./decimal/CustomFieldDecUi";

class CustomFieldsValues extends Component {
  constructor() {
    super();
    this.state = {};
  }
  showCustomFieldOptions(
    groupId,
    customFieldId,
    dataType,
    allowedMultiple,
    options
  ) {
    if (dataType === "DATE") {
      return (
        <CustomFieldDateUi
          passToCustomFieldValues={this.props.passToCustomFieldValues}
          groupId={groupId}
          customFieldId={customFieldId}
          options={options}
        />
      );
    }
    if (dataType === "PARAGRAPH_TEXT") {
      return (
        <CustomFieldParaUi
          passToCustomFieldValues={this.props.passToCustomFieldValues}
          groupId={groupId}
          customFieldId={customFieldId}
          options={options}
        />
      );
    }
    if (dataType === "TEXT") {
      return (
        <CustomFieldTextUi
          passToCustomFieldValues={this.props.passToCustomFieldValues}
          groupId={groupId}
          customFieldId={customFieldId}
          options={options}
        />
      );
    }
    if (dataType === "INTEGER") {
      return (
        <CustomFieldIntUi
          passToCustomFieldValues={this.props.passToCustomFieldValues}
          groupId={groupId}
          customFieldId={customFieldId}
          options={options}
        />
      );
    }
    if (dataType === "DECIMAL") {
      return (
        <CustomFieldDecUi
          passToCustomFieldValues={this.props.passToCustomFieldValues}
          groupId={groupId}
          customFieldId={customFieldId}
          options={options}
        />
      );
    }
  }
  render() {
    let {
      groupId,
      customFieldId,
      dataType,
      allowedMultiple,
      options
    } = this.props;

    return (
      <div>
        {this.showCustomFieldOptions(
          groupId,
          customFieldId,
          dataType,
          allowedMultiple,
          options
        )}
      </div>
    );
  }
}
export default CustomFieldsValues;
