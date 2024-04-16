import {YolosBase} from '@/index';

describe('YolosBase', () => {
  it('should be defined', () => {
    expect(YolosBase).toBeDefined();
  });
  it('can be defined with only apiKey',() => {
    const yolosBase = new YolosBase('apiKey');
    expect(yolosBase).toBeDefined();
  });
  it('can be define with apiKey and partial client config',() => {
    const yolosBase = new YolosBase('apiKey',{maxRetries: 5});
    expect(yolosBase).toBeDefined();
  });
});
