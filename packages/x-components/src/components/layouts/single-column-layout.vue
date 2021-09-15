<template>
  <div class="x-layout x-layout--single-column" :class="{ 'dev-mode': devMode }">
    <header v-if="hasContent('header')" class="x-layout__header x-list x-list--horizontal">
      <!-- @slot Slot that is used to insert content into the Header. -->
      <slot name="header">
        <span v-if="devMode" class="slot-helper">HEADER</span>
      </slot>
    </header>
    <div v-if="hasContent('sub-header')" class="x-layout__sub-header x-list x-list--horizontal">
      <!-- @slot Slot that can be used to insert content into the Sub Header. -->
      <slot name="sub-header">
        <span v-if="devMode" class="slot-helper">SUB HEADER</span>
      </slot>
    </div>

    <div v-if="hasContent('toolbar')" class="x-layout__toolbar x-list x-list--horizontal">
      <!-- @slot Slot that can be used to insert content into the Toolbar. -->
      <slot name="toolbar">
        <span v-if="devMode" class="slot-helper">TOOLBAR</span>
      </slot>
    </div>

    <div v-if="hasContent('predictive')" class="x-layout__predictive x-list x-list--vertical">
      <BaseScroll>
        <!-- @slot Slot that can be used to insert content into the Predictive Layer. -->
        <slot name="predictive">
          <span v-if="devMode" class="slot-helper">PREDICTIVE</span>
        </slot>
      </BaseScroll>
    </div>

    <main v-if="hasContent('main')" class="x-layout__main x-list x-list--vertical">
      <BaseIdScroll id="main-scroll">
        <!-- @slot Slot that can be used to insert content into the Main. -->
        <slot name="main">
          <span v-if="devMode" class="slot-helper">MAIN</span>
        </slot>
      </BaseIdScroll>
    </main>

    <div v-if="hasContent('floating')" class="x-layout__floating x-list x-list--horizontal">
      <!-- @slot Slot that can be used to insert content into the Floating. -->
      <slot name="floating">
        <span v-if="devMode" class="slot-helper">FLOATING</span>
      </slot>
    </div>

    <footer v-if="hasContent('footer')" class="x-layout__footer x-list x-list--horizontal">
      <!-- @slot Slot that can be used to insert content into the Footer. -->
      <slot name="footer">
        <span v-if="devMode" class="slot-helper">FOOTER</span>
      </slot>
    </footer>

    <BaseIdModal
      v-if="hasContent('aside')"
      :animation="asideAnimation"
      modalId="aside-modal"
      class="x-layout__aside"
    >
      <!-- @slot Slot that can be used to insert content into the Aside. -->
      <slot name="aside">
        <span v-if="devMode" class="slot-helper">ASIDE</span>
      </slot>
    </BaseIdModal>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  import BaseIdModal from '../modals/base-id-modal.vue';
  import TranslateFromRight from '../animations/translate-from-right.vue';
  import BaseIdScroll from '../scroll/base-id-scroll.vue';
  import BaseScroll from '../scroll/base-scroll.vue';

  /**
   * Component for use as Layout to be filled with the rest of the Components.
   *
   * @public
   */
  @Component({
    components: { BaseIdScroll, BaseScroll, BaseIdModal }
  })
  export default class SingleColumnLayout extends Vue {
    /**
     * Enables the devMode, which shows the available slots to use with its names.
     *
     * @public
     */
    @Prop({ default: false })
    protected devMode!: boolean;

    /**
     * The animation used for the Main Aside.
     *
     * @public
     */
    @Prop({ default: () => TranslateFromRight })
    protected asideAnimation!: Vue;

    /**
     * Function to check if an slot has rendered content or not.
     *
     * @param slotNames - A VNode Array with of each slot.
     * @returns True if the slot has rendered content or false otherwise.
     *
     * @internal
     */
    protected hasContent(...slotNames: string[]): boolean {
      return (
        (this.devMode ||
          slotNames.some(slotName =>
            this.$slots[slotName]?.some(vNode => vNode.tag !== undefined)
          )) ??
        false
      );
    }
  }
</script>

<style scoped lang="scss">
  .x-layout {
    display: grid;
    align-content: stretch;
    justify-content: stretch;
    height: 100%;

    grid-template-rows:
      [page-start header-start]
      auto
      [header-end sub-header-start]
      auto
      [sub-header-end toolbar-start]
      auto
      [toolbar-end main-start]
      1fr
      [floating-start]
      auto
      [main-end floating-end footer-start]
      auto
      [footer-end page-end];

    grid-template-columns: 1fr;

    > * {
      grid-column: 1/-1;
      min-width: 0;
      min-height: 0;
      display: flex;
    }
    &__header {
      grid-row: header;
    }
    &__sub-header {
      grid-row: sub-header;
    }
    &__toolbar {
      grid-row: toolbar;
    }
    &__predictive {
      grid-row-start: header-end;
      grid-row-end: page-end;
      flex-flow: column nowrap;
      z-index: 2;
    }
    &__main {
      grid-row: main;
      flex-flow: column nowrap;
    }
    &__floating {
      grid-row: floating;
      z-index: 1;
    }
    &__footer {
      grid-row: footer;
    }
    &__aside {
      grid-row: page;
      z-index: 3;

      ::v-deep .x-modal__content {
        margin-inline-start: var(--x-size-margin-left-layout-s, 0);
      }
    }
    &__predictive,
    &__floating,
    &__aside,
    .slot-helper {
      pointer-events: none;
      ::v-deep > * {
        pointer-events: all;
      }

      ::v-deep .x-list {
        pointer-events: none;
        > * {
          pointer-events: all;
        }
      }
    }
  }

  .dev-mode {
    .slot-helper {
      font-family: inherit;
      color: grey;
      box-sizing: border-box;
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;
      border: dashed 1px grey;
      border-radius: 10px;
    }
  }
</style>