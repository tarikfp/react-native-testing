import * as React from 'react';
import ErrorScreen from '../screens/error';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(_error: Error): State {
    return {hasError: true};
  }

  public componentDidCatch(_error: Error, _errorInfo: React.ErrorInfo): void {}

  private resetState = (): void => {
    this.setState({hasError: false});
  };

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return <ErrorScreen resetError={this.resetState} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
