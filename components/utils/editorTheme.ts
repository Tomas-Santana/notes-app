import {
  darkEditorTheme,
  Images,
  ToolbarItem,
  ToolbarTheme,
} from "@10play/tentap-editor";
import { Platform } from "react-native";

const customCSS = `
  * {
    background-color: #191919;
    color: white;
    font-family: 'Inter', sans-serif;
  }
  blockquote {
    border-left: 3px solid #babaca;
    padding-left: 1rem;
  }
  .highlight-background {
    background-color: #474749;
  }
`;

const darkToolbarTheme: Partial<ToolbarTheme> = {
  toolbarBody: {
    borderTopColor: "#191919",
    borderBottomColor: "#191919",
    backgroundColor: "#191919",
  },
  toolbarButton: {
    backgroundColor: "#191919",
  },
  iconDisabled: {
    tintColor: "#CACACA",
  },
  iconActive: {
    tintColor: "#A15CD6"
  },
  iconWrapperActive: {
    backgroundColor: "#303030",
  },
  iconWrapper: {
    borderRadius: 4,
    backgroundColor: "#191919",
  },
  hidden: {
    display: "none",
  },
  icon: {
    tintColor: "white",
  },
  linkBarTheme: {
    addLinkContainer: {
      backgroundColor: "#474747",
      borderTopColor: "#939394",
      borderBottomColor: "#939394",
    },
    linkInput: {
      backgroundColor: "#474747",
      color: "white",
    },
    placeholderTextColor: "#B2B2B8",
    doneButton: {
      backgroundColor: "#0085FF",
    },
    doneButtonText: {
      color: "white",
    },
    linkToolbarButton: {},
  },
};

const customDarkTheme = {
  ...darkEditorTheme,
  toolbar: darkToolbarTheme as ToolbarTheme,
};

export const TOOLBAR_ITEMS: ToolbarItem[] = [
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.undo(),
    active: () => false,
    disabled: ({ editorState }) => !editorState.canUndo,
    image: () => Images.undo,
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.redo(),
    active: () => false,
    disabled: ({ editorState }) => !editorState.canRedo,
    image: () => Images.redo,
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleBold(),
    active: ({ editorState }) => editorState.isBoldActive,
    disabled: ({ editorState }) => !editorState.canToggleBold,
    image: () => Images.bold,
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleItalic(),
    active: ({ editorState }) => editorState.isItalicActive,
    disabled: ({ editorState }) => !editorState.canToggleItalic,
    image: () => Images.italic,
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleTaskList(),
    active: ({ editorState }) => editorState.isTaskListActive,
    disabled: ({ editorState }) => !editorState.canToggleTaskList,
    image: () => Images.checkList,
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleCode(),
    active: ({ editorState }) => editorState.isCodeActive,
    disabled: ({ editorState }) => !editorState.canToggleCode,
    image: () => Images.code,
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleUnderline(),
    active: ({ editorState }) => editorState.isUnderlineActive,
    disabled: ({ editorState }) => !editorState.canToggleUnderline,
    image: () => Images.underline,
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleStrike(),
    active: ({ editorState }) => editorState.isStrikeActive,
    disabled: ({ editorState }) => !editorState.canToggleStrike,
    image: () => Images.strikethrough,
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleBlockquote(),
    active: ({ editorState }) => editorState.isBlockquoteActive,
    disabled: ({ editorState }) => !editorState.canToggleBlockquote,
    image: () => Images.quote,
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleOrderedList(),
    active: ({ editorState }) => editorState.isOrderedListActive,
    disabled: ({ editorState }) => !editorState.canToggleOrderedList,
    image: () => Images.orderedList,
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleBulletList(),
    active: ({ editorState }) => editorState.isBulletListActive,
    disabled: ({ editorState }) => !editorState.canToggleBulletList,
    image: () => Images.bulletList,
  },
  {
    // Regular list items (li) and task list items both use the
    // same sink command and button just with a different parameter, so we check both states here
    onPress:
      ({ editor, editorState }) =>
      () =>
        editorState.canSink ? editor.sink() : editor.sinkTaskListItem(),
    active: () => false,
    disabled: ({ editorState }) =>
      !editorState.canSink && !editorState.canSinkTaskListItem,
    image: () => Images.indent,
  },
  {
    // Regular list items (li) and task list items both use the
    // same lift command and button just with a different parameter, so we check both states here
    onPress:
      ({ editor, editorState }) =>
      () =>
        editorState.canLift ? editor.lift() : editor.liftTaskListItem(),
    active: () => false,
    disabled: ({ editorState }) =>
      !editorState.canLift && !editorState.canLiftTaskListItem,
    image: () => Images.outdent,
  },
];

export { customDarkTheme, customCSS };
