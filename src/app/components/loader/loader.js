import React, {Component} from "react";
import {connect} from "react-redux";
import {SCREEN_STATE_LOADING} from "pawjs/src/components/screen/action";
import * as styles from "./loader.scss";
import Transition from "pawjs/src/components/transition";

@connect( state => {
  return {
    screenState: state.screen.state,
  };
})
export default class Loader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {
          this.props.screenState === SCREEN_STATE_LOADING &&
          (
            <div className={styles["loader-section"]}>
              <div className={styles["screen-loader"]} />
            </div>
          )
        }
        <Transition
          className={styles["animator"]}
          onEnterClassName={styles["fade-in"]}
          onExitClassName={styles["fade-out"]}
        >
          {this.props.children || null}
        </Transition>
      </div>
    );
  }
}