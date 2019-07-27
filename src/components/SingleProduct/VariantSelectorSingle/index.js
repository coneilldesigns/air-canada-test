import React, {Component} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class VariantSelectorsSingle extends Component {
  constructor(props) {
    super(props);


    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      text: ''
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  assignToInput(e) {

    this.props.handleOptionChange(e);
    var selectedTarget = e.target;
    var selectedTargetReadOut = e.target.name.toLowerCase();
    var selectedValue = e.target.value;
    var readOut = "read-out-" + selectedTargetReadOut;
    if(e.target.name === 'Color') {
      document.getElementsByClassName(readOut)[0].innerHTML = '<span style="color:'+ e.target.value +';">' + selectedValue + '</span>';
    } else {
      document.getElementsByClassName(readOut)[0].innerHTML = selectedValue;
    }
  }

  render() {
    var className = 'col-4 ' + 'selector-' + this.props.option.name;
    var readOutClass = 'read-out read-out-' + this.props.option.name.toLowerCase();

    var colorStyle = {
      color: this.props.option.values[0].value.toLowerCase()
    }

    return (
      <div className={className}>
        <Dropdown
          direction="up"
          className="Product__option"
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}>
        <div className={readOutClass}><span style={colorStyle}>{this.props.option.values[0].value}</span></div>
        <DropdownToggle caret>
          {this.props.option.name}
        </DropdownToggle>
        <DropdownMenu>
          {this.props.option.values.map((value, index) => {
            return (
              <DropdownItem
                value={value}
                name={this.props.option.name}
                onClick={this.assignToInput.bind(this)}
                key={`${this.props.option.name}-${index}`}>
                {`${value}`}
              </DropdownItem>
            )
          })}
        </DropdownMenu>
      </Dropdown>
      </div>
    );
  }
}

export default VariantSelectorsSingle;
