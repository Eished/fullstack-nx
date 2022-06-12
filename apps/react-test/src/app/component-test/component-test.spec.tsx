import { render } from '@testing-library/react';

import ComponentTest from './component-test';

describe('ComponentTest', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ComponentTest />);
    expect(baseElement).toBeTruthy();
  });
});
