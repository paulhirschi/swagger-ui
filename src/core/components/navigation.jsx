import React, { PropTypes } from "react"

export default class Navigation extends React.Component {

  static propTypes = {
    specSelectors: PropTypes.object.isRequired,
    specActions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    layoutActions: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    authSelectors: PropTypes.object.isRequired,
  };

  static defaultProps = {

  };

  render() {
    let {
      specSelectors,
      specActions,
      getComponent,
      layoutSelectors,
      layoutActions,
      authActions,
      authSelectors,
      fn
    } = this.props

    let taggedOps = specSelectors.taggedOperations()

    const Operation = getComponent("operation")
    const Collapse = getComponent("Collapse")

    let showSummary = layoutSelectors.showSummary()

    return (
        <div className="swagger-ui-api-navigation">
          <p>Api Topics</p>
          {
            taggedOps.map( (tagObj, tag) => {
              let operations = tagObj.get("operations")
              let tagDescription = tagObj.getIn(["tagDetails", "description"], null)

              let isShownKey = ["operations-tag", tag]
              let showTag = layoutSelectors.isShown(isShownKey, true)

              return (
                    <a href={'#' + tag} className={tag === "CORS" ? "hidden" : ""} key={"navigation-" + tag}>{tag}</a>
                  
                )
            }).toArray()
          }

          { taggedOps.size < 1 ? <h3> No operations defined in spec! </h3> : null }
          <a href="#models" className="navigation-models">API Models</a>
        </div>
    )
  }

}


// Navigation.propTypes = {
//   layoutActions: PropTypes.object.isRequired,
//   specSelectors: PropTypes.object.isRequired,
//   specActions: PropTypes.object.isRequired,
//   layoutSelectors: PropTypes.object.isRequired,
//   getComponent: PropTypes.func.isRequired,
//   fn: PropTypes.object.isRequired
// }