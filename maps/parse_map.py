import re


def compile_map(name):

    with open(f"{name}/{name}.svg") as file:
        svg_text = file.read()

    box_pattern = re.compile(r'id="box.*?"\n\s*width="([0-9.]+)"\n\s*height="([0-9.]+)"\n\s*x="([0-9.]+)"\n\s*y="([0-9.]+)"')
    spawn_pattern = re.compile(r'id="spawn.*?"\n\s*cx="([0-9.]+)"\n\s*cy="([0-9.]+)"')
    scene_pattern = re.compile(r'viewBox="0 0 ([0-9\.]+) ([0-9\.]+)"')

    scene = next(map(retrieve_scene_element, scene_pattern.finditer(svg_text)))
    boxes = map(retrieve_box_element, box_pattern.finditer(svg_text))
    spawns = map(retrieve_spawn_element, spawn_pattern.finditer(svg_text))

    create_svelte(f"{name}/{name}.svelte", svg_text)
    create_ts(f"{name}/{name}.ts", scene, boxes, spawns)



def create_svelte(name, svg_text):
    file = open(name, "w")

    lines = svg_text.split('\n')
    lines = lines[3:]
    svg_text = '\n'.join(lines)

    file.write(svg_text)


def create_ts(name, scene, boxes, spawns):
    ts_file = open(name, "w")

    ts_file.write('import {Scene} from "./../../src/ts/scene";\n\n')

    scene_dimensions = scene;

    ts_text = """// Hi! I have been generated automatically by a computer program
    // written by a person, who deserves all recgnition but no blame
    // for whatever happens\n\n"""
            
    ts_text += f'export let scene = new Scene([{scene_dimensions[0]}, {scene_dimensions[1]}],\n\t['

    first = True
    for box in boxes:
        if not first:
            ts_text += ","
        else:
            first = False

        ts_text += f'\n\t\t[[{box[0][0]},{box[0][1]}],[{box[1][0]},{box[1][1]}]]'

    ts_text += "\n\t],\n\t["

    first = True
    for spawn in spawns:
        if not first:
            ts_text += ","
        else:
            first = False

        ts_text += f'\n\t\t[{spawn[0]},{spawn[1]}]'


    ts_text += "\n\t]);\n"

    ts_file.write(ts_text)

    ts_file.close()


def retrieve_box_element(box_match):
    return [[box_match.groups()[0], box_match.groups()[1]],[box_match.groups()[2], box_match.groups()[3]]]

def retrieve_spawn_element(spawn_match):
    return [spawn_match.groups()[0], spawn_match.groups()[1]]

def retrieve_scene_element(scene_match):
    return [scene_match.groups()[0], scene_match.groups()[1]]



compile_map("basic_map")













