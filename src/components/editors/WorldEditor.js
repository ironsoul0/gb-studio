import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import SceneSelect from "../forms/SceneSelect";
import DirectionPicker from "../forms/DirectionPicker";
import SpriteSheetSelect from "../forms/SpriteSheetSelect";
import { FormField } from "../library/Forms";
import castEventValue from "../../lib/helpers/castEventValue";
import SidebarHeading from "./SidebarHeading";

class WorldEditor extends Component {
  onEditSetting = key => e => {
    this.props.editProjectSettings({
      [key]: castEventValue(e)
    });
  };

  onEditProject = key => e => {
    this.props.editProject({
      [key]: castEventValue(e)
    });
  };

  render() {
    const { project, settings } = this.props;

    if (!project || !project.scenes) {
      return <div />;
    }

    const scenes = project.scenes;

    return (
      <div className="WorldEditor">
        <SidebarHeading title="Project" />

        <div>
          <FormField>
            <label htmlFor="projectName">Name</label>
            <input
              id="projectName"
              value={project.name || ""}
              placeholder="Project Name"
              onChange={this.onEditProject("name")}
            />
          </FormField>

          <FormField>
            <label htmlFor="projectAuthor">Author</label>
            <input
              id="projectAuthor"
              value={project.author || ""}
              placeholder="Author"
              onChange={this.onEditProject("author")}
            />
          </FormField>
        </div>

        <SidebarHeading title="Settings" />

        <div>
          <FormField>
            <label>
              <input
                type="checkbox"
                className="Checkbox"
                checked={settings.showCollisions}
                onChange={this.onEditSetting("showCollisions")}
              />
              <div className="FormCheckbox" />
              Show Collisions
            </label>
          </FormField>

          <FormField>
            <label>
              <input
                type="checkbox"
                className="Checkbox"
                checked={settings.showConnections}
                onChange={this.onEditSetting("showConnections")}
              />
              <div className="FormCheckbox" />
              Show Connections
            </label>
          </FormField>
        </div>

        {scenes.length > 0 && (
          <div>
            <SidebarHeading title="Starting Scene" />

            <FormField>
              <label>
                <div className="Select">
                  <SceneSelect
                    value={settings.startSceneId || ""}
                    onChange={this.onEditSetting("startSceneId")}
                  />
                </div>
              </label>
            </FormField>

            <FormField>
              <label htmlFor="playerSprite">Player Sprite Sheet</label>
              <SpriteSheetSelect
                id="playerSprite"
                value={settings.playerSpriteSheetId}
                direction={settings.startDirection}
                onChange={this.onEditSetting("playerSpriteSheetId")}
              />
            </FormField>

            <FormField halfWidth>
              <label htmlFor="startX">X</label>
              <input
                id="startX"
                type="number"
                value={settings.startX}
                min={0}
                max={30}
                placeholder={0}
                onChange={this.onEditSetting("startX")}
              />
            </FormField>

            <FormField halfWidth>
              <label htmlFor="startY">Y</label>
              <input
                id="startY"
                type="number"
                value={settings.startY}
                min={0}
                max={31}
                placeholder={0}
                onChange={this.onEditSetting("startY")}
              />
            </FormField>

            <FormField>
              <label htmlFor="startDirection">Direction</label>
              <DirectionPicker
                id="startDirection"
                value={settings.startDirection || 0}
                onChange={this.onEditSetting("startDirection")}
              />
            </FormField>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    project: state.project.present,
    settings: (state.project.present && state.project.present.settings) || {}
  };
}

const mapDispatchToProps = {
  editProject: actions.editProject,
  editProjectSettings: actions.editProjectSettings
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorldEditor);
