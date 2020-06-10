import { mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import { getResultsStub } from '../../__stubs__/results-stubs.factory';
import { getDataTestSelector, installNewXPlugin } from '../../__tests__/utils';
import BaseResultPreviousPrice from '../base-result-previous-price.vue';

describe('testing BaseResultPreviousPrice component', () => {
  let priceWrapper: Wrapper<BaseResultPreviousPrice>;
  const results = getResultsStub();

  beforeEach(() => {
    const [, localVue] = installNewXPlugin();
    priceWrapper = mount(BaseResultPreviousPrice, {
      localVue,
      propsData: { result: results[1] }
    });
  });

  it('renders the previous price', () => {
    expect(getElement()).toBeDefined();
    expectPriceValue(results[1].price.originalValue);
  });

  it('should not renders the previous price if it has not discount', async () => {
    priceWrapper.setProps({ result: results[0] });
    await Vue.nextTick();
    expect(getElement()).toBeUndefined();
  });

  function expectPriceValue(priceValue: number): void {
    expect(getElement()).toBeDefined();
    expect(priceWrapper.text()).toEqual(priceValue.toString());
  }

  function getElement(): HTMLElement {
    return priceWrapper.find(getDataTestSelector('result-previous-price')).element;
  }
});
