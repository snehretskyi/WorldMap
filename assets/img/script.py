import xml.etree.ElementTree as ET
from collections import defaultdict

def group_paths_by_country(svg_file):
    # Parse the SVG file
    tree = ET.parse(svg_file)
    root = tree.getroot()

    # Define the namespaces (SVG files often use namespaces)
    namespaces = {'svg': 'http://www.w3.org/2000/svg'}

    # Dictionary to hold paths grouped by country
    grouped_paths = defaultdict(list)

    # Iterate over all path elements
    for path in root.findall('.//svg:path', namespaces):
        # Extract the 'id', 'name', or 'class' attribute if it exists
        country_id = path.get('id')
        country_name = path.get('name')
        country_class = path.get('class')

        # Determine the country attribute to use as the key
        country_key = country_id or country_name or country_class
        if country_key:
            grouped_paths[country_key].append(path)

    return grouped_paths

def write_grouped_paths_to_file(grouped_paths, output_file):
    svg_ns = 'http://www.w3.org/2000/svg'
    svg_element = ET.Element(f'svg', xmlns=svg_ns, width="1000", height="1000")  # Adjust size as needed

    for country, paths in grouped_paths.items():
        # Create a group element for each country
        g_element = ET.SubElement(svg_element, f'g', id=country)

        for path in paths:
            # Clone the path element to add to the new group
            new_path = ET.SubElement(g_element, f'path', attrib=path.attrib)


 # Function to pretty print XML
    def pretty_print(element, indent='  ', level=0):
        if len(element) > 0:
            element.text = element.text.strip() if element.text else ''
            element.text += '\n' + indent * (level + 1)
            for child in element:
                pretty_print(child, indent, level + 1)
                if child.tail is None:
                    child.tail = ''
                child.tail = '\n' + indent * level
        else:
            if level and (element.tail is None):
                element.tail = '\n' + indent * level

    pretty_print(svg_element)

    # Write the new SVG structure to file
    tree = ET.ElementTree(svg_element)
    tree.write(output_file, encoding='utf-8', xml_declaration=True)


# Usage
svg_file = 'world.svg'  # Replace with the path to your SVG file
output_file = 'grouped_paths.svg'  # Output file name
grouped_paths = group_paths_by_country(svg_file)
write_grouped_paths_to_file(grouped_paths, output_file)
