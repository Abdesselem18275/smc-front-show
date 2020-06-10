import { CustomPluralPipe } from './custom-plural.pipe';

describe('CustomPluralPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomPluralPipe();
    expect(pipe).toBeTruthy();
  });
});
