import React from 'react'
import ReactDOM from 'react-dom'

import Button from 'react-bootstrap/lib/Button'
import Overlay from 'react-overlays/lib/Overlay'

// Styles mostly from Bootstrap.
const styles = {
  tooltip: {
    position: 'absolute',
    padding: '0 5px',
    // transition: 'all 0.2s ease-out 0.2s',
  },

  inner: {
    padding: '3px 8px',
    color: '#fff',
    textAlign: 'center',
    borderRadius: 3,
    backgroundColor: '#000',
    opacity: 0.75,
  },

  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    opacity: 0.75,
  },
}

const placementStyles = {
  left: {
    tooltip: {
      marginLeft: -3,
      padding: '0 5px',
    },

    arrow: {
      right: 0,
      borderWidth: '5px 0 5px 5px',
      borderColor: 'transparent transparent transparent #000',
    },
  },

  right: {
    tooltip: {
      marginLeft: 3,
      padding: '0 5px',
    },

    arrow: {
      left: 0,
      borderWidth: '5px 5px 5px 0',
      borderColor: 'transparent #232323 transparent transparent',
    },
  },

  top: {
    tooltip: {
      marginTop: -3,
      padding: '5px 0',
    },

    arrow: {
      bottom: 0,
      borderWidth: '5px 5px 0',
      borderColor: '#232323 transparent transparent transparent',
    },
  },

  bottom: {
    tooltip: {
      marginBottom: 3,
      padding: '5px 0',
    },

    arrow: {
      top: 0,
      borderWidth: '0 5px 5px',
      borderColor: 'transparent transparent #232323 transparent',
    },
  },
}

const PLACEMENTS = ['left', 'top', 'right', 'bottom']

function Tooltip({ placement, children, arrowProps, style, popperRef }) {
  const placementStyle = placementStyles[placement]
  return (
    <div
      ref={popperRef}
      style={{
        ...styles.tooltip,
        ...placementStyle.tooltip,
        ...style,
      }}
    >
      <div
        {...arrowProps}
        style={{
          ...styles.arrow,
          ...arrowProps.style,
          ...placementStyle.arrow,
        }}
      />
      <div style={{ ...styles.inner }}>{children}</div>
    </div>
  )
}

class OverlayExample extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      show: false,
      placement: null,
    }

    this.onClick = () => {
      const { placement } = this.state
      const nextPlacement = PLACEMENTS[PLACEMENTS.indexOf(placement) + 1]

      return this.setState({
        show: !!nextPlacement,
        placement: nextPlacement,
      })
    }
  }

  render() {
    const { show, placement } = this.state

    return (
      <div className="overlay-example">
        <Button
          bsStyle="primary"
          ref={c => {
            this.target = c && ReactDOM.findDOMNode(c)
          }}
          onClick={this.onClick}
        >
          I am an Overlay target
        </Button>
        <p>Keep clicking to see the placement change.</p>

        <Overlay
          show={show}
          onHide={() => this.setState({ show: false })}
          placement={placement}
          container={this}
          target={() => this.target}
        >
          {({ ref, style, arrowProps, placement }) => (
            <Tooltip
              popperRef={ref}
              style={style}
              placement={placement}
              arrowProps={arrowProps}
            >
              I&rsquo;m placed to the <strong>{placement}</strong>.
            </Tooltip>
          )}
        </Overlay>
      </div>
    )
  }
}

export default OverlayExample
