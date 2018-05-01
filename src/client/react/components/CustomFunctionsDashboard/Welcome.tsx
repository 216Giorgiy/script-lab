import * as React from 'react';
import styled from 'styled-components';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

const { localStorageKeys } = PLAYGROUND;

const gray = '#333333';

const sampleFunction = `/** @CustomFunction */
function add(a: number, b: number): number {
\u00A0\u00A0\u00A0\u00A0return a + b;
}
`;

const ListItem = styled.li`
  margin-bottom: 26px;
`;

const Instructions = styled.div`
  text-align: left;
`;

const CodeBlock = styled.pre`
  white-space: pre-line;
  background: #eeeeee;
  padding: 6px;
  margin-top: 8px;
`;

interface State {
  lastTimestamp: number;
  refreshDisabled: boolean;
}

export default class Welcome extends React.Component<{}, State> {
  private interval;
  constructor(props) {
    super(props);

    const lastTimestamp =
      Number(
        window.localStorage.getItem(
          localStorageKeys.customFunctionsLastEditorUpdateTimestamp
        )
      ) || Date.now();

    this.state = { lastTimestamp, refreshDisabled: true };
  }

  enableRefreshIfReady() {
    const newTimestamp =
      Number(
        window.localStorage.getItem(
          localStorageKeys.customFunctionsLastEditorUpdateTimestamp
        )
      ) || 0;
    if (newTimestamp > this.state.lastTimestamp) {
      this.setState({ refreshDisabled: false });
    }
  }

  refresh = () => window.location.reload();

  componentDidMount() {
    this.interval = setInterval(() => this.enableRefreshIfReady(), 250);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div id="progress" className="ms-progress-component">
        <div id="ribbon" className="ribbon" />
        <main className="ms-progress-component__main">
          <img
            className="ms-progress-component__logo"
            src="../assets/images/icon-large.svg"
          />
          <h1
            id="title"
            className="ms-font-su"
            style={{ lineHeight: '56px', color: gray }}
          >
            Welcome
          </h1>
          <p
            style={{
              marginTop: '7px',
              lineHeight: '17px',
              color: gray,
              maxWidth: '200px',
              textAlign: 'center',
            }}
            className="ms-font-s-plus"
          >
            Discover what custom functions can do for you today!
          </p>
          <hr
            style={{
              width: '141px',
              marginTop: '24px',
              marginBottom: '32px',
              color: '#cccccc',
            }}
          />
          <Instructions>
            <p className="ms-font-s-plus" style={{ marginBottom: '19px' }}>
              Get started with your first custom functions.
            </p>
            <ol className="ms-font-s" style={{ marginLeft: '10px' }}>
              <ListItem>Open the code editor.</ListItem>
              <ListItem>
                Copy the following script and paste it into the editor.
                <CodeBlock className="ms-font-xs">{sampleFunction}</CodeBlock>
              </ListItem>
              <ListItem>
                After pasting, click the <strong>Refresh</strong> button below.
              </ListItem>
            </ol>
            <DefaultButton
              primary
              disabled={this.state.refreshDisabled}
              onClick={this.refresh}
              text="Refresh"
              style={{
                display: 'block',
                margin: '0 auto',
              }}
            />
          </Instructions>
        </main>
      </div>
    );
  }
}
