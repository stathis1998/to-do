export enum ObjectType {
  PAGE = "PAGE",
  FOLDER = "FOLDER",
  PAGES_ROOT = "PAGES_ROOT",
  IMAGE = "IMAGE",
}

export enum MimeType {
  SVG = "SVG",
  EMPTY = "EMPTY",
}

export enum State {
  CREATED = "CREATED",
  UPDATED = "UPDATED",
}

export type Localization = {
  [language: string]: {
    name: string;
  };
};

export type Metadata = {
  localization: Localization;
};

export type Content = {
  id: string;
  data: unknown;
};

export type ProjectLight = {
  id: string;
  name: string;
  type: ObjectType;
};

export type ProjectTree = {
  projectId: string;
  parentId: string | null;
  userId: string | null;
  rootType: ObjectType;
  mimeType: MimeType;
  state: State;
  updateTime: number;
  metadata: Metadata | null;
  content: Content;
  children: ProjectTree[];
  contentData: unknown | null;
  contentId: string | null;
} & ProjectLight;
