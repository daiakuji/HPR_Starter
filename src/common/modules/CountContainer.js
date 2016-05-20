import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from './Counter'
import * as CounterActions from './Count'

function mapStateToProps(state) {
  return {
    counterValue: state
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)